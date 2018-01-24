require('dotenv').config();

module.exports = {
  line: {
    accessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
  },
};
