const express = require("express");
const app = express();

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});


app.get("/", (req, res, next) => {
  // 常见的响应头详见这篇文章：https://www.jianshu.com/p/27a32885fa7a
  
  // 告诉客户端数据格式为 json，编码方式为 utf-8
  // 如果不设置这个 header 的话，浏览器默认是按照二进制数据来解析的，所以会乱码；其它客户端可能默认就是 utf-8 解码
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({
    "msg": "中文编码测试",
  });
});
