const express = require("express");
const app = express();

app.post("/login", (req, res, next) => {
  // 常见的请求头字段详见这篇文章：https://www.jianshu.com/p/27a32885fa7a
  console.log("请求头：", req.headers);
  res.end("登录成功~");
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});