const express = require("express");
const app = express();

// 解析 url 用的模块
const urlModule = require("url");
// 解析 get 请求 url 里参数用的模块
const qsModule = require("querystring");

// 1.1 我们自己解析 post 请求的请求体
// * 监听 req 对象的 data 和 end 事件
// * data => jsonString => jsonObj
app.post("/login", (req, res, next) => {
  let jsonObj = {};

  // POST 请求一般有请求体，传给服务器的一堆入参一般放在请求体里、而不是 URL 里
  // 我们前面已经说过 req 对象其实是一个 ReadableStream 对象，所以我们可以通过监听 req 对象的 data 事件来获取请求体里的数据。监听流的 data 事件，每当读取到数据时，就会触发该事件（正是因为 Stream 类继承自 EventEmitter 类）
  // 默认一次性能读取 64KB 的数据，一般的请求能一次性读取完，所以就不用拼接数据了
  // 并且这里是一个常规的登录请求，而不是图片、音频、视频、文件等那类需要直接用二进制数据的请求，所以我们可以把读取到的数据搞成 JSON 字符串输出（默认用的是 utf-8 解码），因为常规请求一般传输的都是 JSON 字符串而不是直接的二进制数据
  req.on("data", (chunk) => {
    const jsonString = chunk.toString();
    jsonObj = JSON.parse(jsonString);
    console.log("请求参数：", jsonObj);
  });
  // 监听流的 end 事件，当读取数据完毕后，就会触发该事件
  req.on("end", () => {
    if (jsonObj.username === "watson" && jsonObj.password === "123456") {
      res.statusCode = 200;
      res.end(JSON.stringify({
        "code": 200,
        "message": "登录成功",
        "data": {
            "token": "1234567890",
          },
        }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({
        "code": 200,
        "message": "登录失败",
        "data": {
          "msg": "请检查用户名或密码是否正确",
        },
      }));
    }
  });
});

// 1.2 使用 express 内置的 json() 中间件解析 post 请求的请求体
// * 注册一下中间件：express.json()
// * 这个中间件内部就是在解析 post 请求体里的数据，解析成 jsonObj 后，会把 jsonObj 赋值给 req 对象的 body 属性，然后调用 next() 函数，所以我们直接使用 req.body 就可以了
app.use("/login1", express.json());
app.post("/login1", (req, res, next) => {
  console.log("请求参数：", req.body);

  if (req.body.username === "watson" && req.body.password === "123456") {
    res.statusCode = 200;
    res.end(JSON.stringify({
      "code": 200,
      "message": "登录成功",
      "data": {
          "token": "1234567890",
        },
      }));
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify({
      "code": 200,
      "message": "登录失败",
      "data": {
        "msg": "请检查用户名或密码是否正确",
      },
    }));
  }
});

// 2.1 我们自己解析 get 请求的请求参数
// req.url => urlObj => qsString => qsObj
app.get("/songList", (req, res, next) => {
  const urlString = req.url;
  const urlObj = urlModule.parse(urlString);
  const qsString = urlObj.query;
  const qsObj = qsModule.parse(qsString);
  console.log("请求参数：", qsObj);

  res.statusCode = 200;
  res.end(JSON.stringify({
    "code": 200,
    "message": "获取歌单成功",
    "data": {
      "id": qsObj.id,
      "page": qsObj.page,
      "size": qsObj.size,
    },
  }));
});

// 2.2 express 框架内部已经自动完成了 get 请求的请求参数解析，我们只需要使用 req.query 这个 jsonObj 就可以了，也不需要再使用别的中间件
app.get("/songList1", (req, res, next) => {
  console.log("请求参数：", req.query);

  res.statusCode = 200;
  res.end(JSON.stringify({
    "code": 200,
    "message": "获取歌单成功",
    "data": {
      "id": req.query.id,
      "page": req.query.page,
      "size": req.query.size,
    },
  }));
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});