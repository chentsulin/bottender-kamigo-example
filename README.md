# bottender-kamigo-example

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/chentsulin/bottender-kamigo-example&env=ACCESS_TOKEN&env=CHANNEL_SECRET)

以 [Bottender](https://github.com/Yoctol/bottender) 實作的卡米狗範例

## 支援的卡米狗指令

### 學說話

```
卡米狗學說話;關鍵字;要回的話
```

範例：

```
卡米狗學說話;紅茶拿鐵;拿的動嗎?
```

### 忘記

```
卡米狗忘記;關鍵字
```

範例：

```
卡米狗忘記;紅茶拿鐵
```

## 目錄結構

整個目錄結構大概是這樣：

```
bottender-kamigo-example/
  bin/
    start
  node_modules/
  bot.js
  bottender.config.js
  builder.js
  server.js
  package.json
  README.md
  yarn.lock
  .env
```

檔案大致的職責分配：

* `bin/start` - 程式進入點。
* `bot.js` - Bot 初始化相關的程式碼。
* `builder.js` - 用 Builder 建立的主邏輯。
* `server.js` - Server 相關的程式，要變換 Server (expres, koa, micro, restify)、或加 API 可以改動這裡。
* `bottender.config.js` - 所有 Bottender 相關的設定放置位置。
* `.env` - 放置環境變數，包括 `ACCESS_TOKEN` 以及 `CHANNEL_SECRET`。

## Setup

```
yarn
cp .env.sample .env
```

然後必須在 `.env` 中編輯 `ACCESS_TOKEN` 以及 `CHANNEL_SECRET`。

## NPM Scripts

有兩個預先寫好的指令：

### `npm run dev`

用 [nodemon](https://github.com/remy/nodemon) 執行 Bot，會監控修改進行重啟。

### `npm start`

執行 Bot。

## License

MIT © [C. T. Lin](https://github.com/chentsulin/bottender-kamigo-example)
