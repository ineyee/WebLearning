const express = require("express");
const app = express();

// 注意：express 框架跟 http 模块不同的是，http 模块是所有的请求都会触发同一个“request”事件，我们需要在 request 事件里自己判断请求方法和请求路径，而 express 框架是根据请求方法和请求路径来触发不同的“事件”，我们只需要监听这一个一个独立的“事件”即可
// 
// 调用的方法：如果是 get 请求那就调用 get 方法，如果是 post 请求那就调用 post 方法
// 第一个参数：请求路径
// 第二个参数：回调函数，回调函数中会传入三个参数
//    请求对象（request）：本质就是一个 ReadableStream，用来读取客户端发过来的请求数据。包含了客户端请求服务器时的所有信息，如请求方法、请求路径、请求头、请求体等
//    响应对象（response）：本质就是一个 WritableStream，用来写入响应数据给客户端。包含了服务器要返回给客户端的所有信息，如响应状态码、响应头、响应体等
//    next 函数，Express 框架内置的一个函数，用于调用下一个中间件
app.post("/login", (req, res, next) => {
  res.statusCode = 200;
  res.end(JSON.stringify({
    "code": 200,
    "message": "登录成功",
    "data": {
      "token": "1234567890",
    },
  }));
});

app.get("/songList", (req, res, next) => {
  res.statusCode = 200;
  res.end(JSON.stringify({
    "code": 200,
    "message": "获取歌单成功",
    "data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  }));
});

// 为已定义的路径但使用了错误的请求方法时返回 405
app.use("/login", (req, res, next) => {
  res.statusCode = 405;
  res.end(JSON.stringify({
    "code": 405,
    "message": "Method Not Allowed"
  }));
});

app.use("/songList", (req, res, next) => {
  res.statusCode = 405;
  res.end(JSON.stringify({
    "code": 405,
    "message": "Method Not Allowed"
  }));
});

// 放在所有路由定义之后，用于处理未定义的路径
app.use((req, res, next) => {
  res.statusCode = 404;
  res.end(JSON.stringify({
    "code": 404,
    "message": "Not Found"
  }));
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});