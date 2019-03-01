const {router, get, post} = require('microrouter');
const pingPong = require('./command/ping-pong');
const handleAction = require('./handle-action');
const works = require('./works');

module.exports = router(
  get('/_status', (_req, res) => {
    res.end('working');
  }),
  get('/command/ping-pong', works),
  post('/command/ping-pong', pingPong.slashCommand),
  get('/handle-action', works),
  post('/handle-action', handleAction)
);
