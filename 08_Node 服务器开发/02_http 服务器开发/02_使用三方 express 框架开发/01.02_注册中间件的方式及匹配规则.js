/*
  注册中间件的方式及匹配规则
  * app.use(中间件)
    * 用来注册最普通的中间件
    * 最普通的中间件可以匹配到所有的 http 请求
    * 比如要拦截所有的请求，统一修改点东西
  * app.use(路径, 中间件)
    * 用来注册路径匹配的中间件
    * 路径匹配的中间件可以匹配到指定请求路径的 http 请求，请求方法不关心
    * 比如有一个接口，我们允许客户端通过 get 请求和 post 请求都能访问
  * app.get(路径, 中间件)、app.post(路径, 中间件)
    * 用来注册路径和方法匹配的中间件
    * 路径和方法匹配的中间件只能匹配到指定请求路径和请求方法的 http 请求
    * 比如有一个接口，我们只允许客户端通过 get 请求或 post 请求访问
  * app.use/app.get/app.post(路径, 中间件1, 中间件2, 中间件3, ...)
    * 用来一次性注册多个中间件
    * 主要用来把一个中间件拆分成多个中间件，每个中间件负责独立的业务逻辑，代码更加优雅
    * 比如一个登录接口，中间件1需要验证token，中间件2需要验证用户名和密码，中间件3需要从数据库读取用户信息，中间件4需要返回响应
*/

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("我是最普通的中间件，可以匹配到所有的 http 请求");
  next();
});

app.use("/home", (req, res, next) => {
  console.log("我是路径匹配的中间件，可以匹配到指定请求路径的 http 请求");
  next();
});

app.get("/home", (req, res, next) => {
  console.log("我是 get + home 请求的中间件");
  res.end("end~");
});

app.post("/login", (req, res, next) => {
  console.log("验证 token");
  next();
}, (req, res, next) => {
  console.log("验证用户名和密码");
  next();
}, (req, res, next) => {
  console.log("从数据库读取用户信息");
  next();
}, (req, res, next) => {
  console.log("返回响应");
  res.end("登录成功");
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});