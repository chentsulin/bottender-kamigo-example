const { createServer } = require('bottender/express');

const bot = require('./bot');

const server = createServer(bot);

module.exports = server;
