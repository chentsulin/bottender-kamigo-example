const { LineBot } = require('bottender');

const builder = require('./builder');
const config = require('./bottender.config').line;

const bot = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});

bot.onEvent(builder);

module.exports = bot;
