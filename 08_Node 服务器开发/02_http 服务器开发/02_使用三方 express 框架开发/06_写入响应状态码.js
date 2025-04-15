const express = require("express");
const app = express();

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

app.get("/", (req, res, next) => {
  // 常见的响应状态码详见这篇文章：https://www.jianshu.com/p/27a32885fa7a

  // 方式1：使用 status() 方法
  res.status(404).end();

  // 方式2：使用 statusCode 属性
  res.statusCode = 405;
  res.end();
});

