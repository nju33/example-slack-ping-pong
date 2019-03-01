const {send} = require('micro');
const {parse} = require('url');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const {Query, ServeoTransfer} = require('@nju33/slack');
const {CALLBACK_ID} = require('./constants');

const isRelevantAction = action => action.callback_id === CALLBACK_ID;

module.exports = (req, res) =>
  bodyParser.urlencoded({extended: false})(req, res, async () => {
    if (req.method === 'GET') {
      return send(res, 200, `works ${req.url}`);
    } else if (req.method !== 'POST') {
      return send(res, 406);
    }

    const parsedURL = parse(req.url, true);
    const query = new Query(parsedURL.query);
    if (!query.serveoSubdomain) {
      return send(res, 400, {
        message: `required \`serveo-subdomain\` query in url`
      });
    }

    const action = JSON.parse(req.body.payload);
    if (!isRelevantAction(action)) {
      return Promise.reject();
    }

    console.log('req.url: ', req.url);
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    console.log('query.serveoSubdomain: ', query.serveoSubdomain);
    console.log('req.body: ', req.body);
    const serveoTransfer = new ServeoTransfer(
      query.serveoSubdomain,
      parsedURL.path
    );

    if (process.env.NODE_ENV === 'production' && (await serveoTransfer.ok())) {
      await serveoTransfer.transfer(req.body);
      return;
    }

    /**
     * occurred error in case of the send response to serveo.
     */
    if (req.headers.host.indexOf('.now.sh') > -1) {
      return send(res, 200, {text: 'pong'});
    }
    fetch(action.response_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({text: 'pong'})
    });
  });
