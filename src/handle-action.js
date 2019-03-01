const {combineMiddlewares} = require('@nju33/slack');
const pingPong = require('./command/ping-pong');

module.exports = combineMiddlewares(pingPong.interactiveComponent);
