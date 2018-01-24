const { LineHandler } = require('bottender');
const { partition, last } = require('lodash');

const db = {
  map: {},
};

module.exports = new LineHandler()
  .onText(/^卡米狗學說話;([^;]+);([^;]+)$/, async context => {
    // 學說話指令的程式碼
    const { text } = context.event;

    // 斷開後第一個部分是「卡米狗學說話」，可以直接忽略它
    const [, key, val] = text.split(';');

    // 如果沒有教過就初始化
    if (!db.map[key]) db.map[key] = [];

    // 記錄到列表中
    // 用 session.id 可以同時支援 user、room 跟 group
    db.map[key].push({
      sessionId: context.session.id,
      keyword: key,
      message: val,
    });

    await context.replyText('好哦~好哦~*1');
  })
  .onText(/^卡米狗忘記;([^;]+)$/, async context => {
    // 忘記指令的程式碼
    const { text } = context.event;

    // 斷開後第一個部分是「卡米狗忘記」，可以直接忽略它
    const [, key] = text.split(';');

    // 只過濾掉這個 channel 所定義的
    db.map[key] = db.map[key].filter(
      mapping => mapping.sessionId !== context.session.id
    );

    await context.replyText('好哦~好哦~*1');
  })
  .onText(async context => {
    // 回話的程式碼
    const { text } = context.event;

    const mappings = db.map[text];

    // 如果曾經有任何關於這個關鍵字的紀錄
    if (mappings && mappings.length > 0) {
      // 以 sessionId 匹配與否切分成兩個陣列
      const [localMappings, globalMappings] = partition(mappings, {
        sessionId: context.session.id,
      });

      // 先取 local 設定的最後一個，取不到才用 global 的
      const answer = last(
        localMappings.length > 0 ? localMappings : globalMappings
      ).message;

      await context.replyText(answer);
    }
  });
