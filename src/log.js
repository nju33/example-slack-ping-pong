const bunyan = require('bunyan');
const nowConfig = require('../now.json');

module.exports = bunyan.createLogger({name: nowConfig.name});
