const { LineHandler } = require('bottender');
const { partition, last } = require('lodash');

const db = {
  map: {},
};

module.exports = new LineHandler()
  .onText(/^卡米狗學說話;([^;]+);([^;]+)$/, async context => {
    // 學說話指令的程式碼
    const { text } = context.event;

    const [, key, val] = text.split(';');

    // 如果沒有教過就初始化
    if (!db.map[key]) db.map[key] = [];

    console.log(context.session);

    db.map[key].push({
      sessionId: context.session.id,
      keyword: key,
      message: val,
    });

    await context.sendText('好哦~好哦~*1');
  })
  .onText(/^卡米狗忘記;([^;]+)$/, async context => {
    // 忘記指令的程式碼
    const { text } = context.event;

    const [, key] = text.split(';');
    db.map[key] = db.map[key].filter(
      mapping => mapping.sessionId !== context.session.id
    );

    await context.sendText('好哦~好哦~*1');
  })
  .onText(async context => {
    // 回話的程式碼
    const { text } = context.event;

    const mappings = db.map[text];

    if (mappings && mappings.length > 0) {
      // 以 sessionId 有沒有匹配切分成兩個陣列
      const [channelMappings, globalMappings] = partition(mappings, {
        sessionId: context.session.id,
      });

      // 先取 channel 裡設定的最後一個，取不到才用 global 的
      const answer = last(
        channelMappings.length > 0 ? channelMappings : globalMappings
      ).message;

      await context.sendText(answer);
    }
  });
