// 需要首先知道的是，express 框架会自动处理 http 协议的标准错误，比如 404、500 等
// 也就是说我们服务端开发者不需要关心万一客户端请求了一个服务器上根本不存在的路径时咋办，因为框架会自动返回 404 错误给客户端，我们不需要编写任何代码
// 因此这就意味着我们服务端开发者只需要关心业务逻辑的错误，比如 token 校验出错、用户名或密码出错等，这些业务逻辑的错误需要我们手动编写代码返回错误信息给客户端

const express = require('express');
const errorHandler = require("./error_handler");

const app = express();
app.listen(8000, () => {
    console.log("🚀服务器启动成功🚀")
});
app.use(express.json());

app.post("/login2", (req, res, next) => {
  if (req.headers.token !== "qwertyuiop") {
    next(1001);
  } else {
    if ((req.body.username === "admin" && req.body.password === "123456") == false) {
      next(1002);
    } else {
      // 成功的话，返回的数据肯定是跟当前模块紧密相关的，所以就不用抽取到外面去了，直接在当前模块内部返回
      res.json({
        "code": 0,
        "message": "登录成功",
      });
    }
  }
});

// 使用错误处理中间件时，必须注册在所有其它中间件之后
app.use(errorHandler);

