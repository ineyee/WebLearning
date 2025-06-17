const Koa = require("koa");
const KoaRouter = require("@koa/router");
// 安装并导入 koa-session 库
const koaSession = require("koa-session");

const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 创建一个 session
const session = koaSession(
  {
    // 其实就是浏览器里 cookie 的 key
    key: "sessionId",
    // 对 cookie 的值进行加盐
    sign: true,
    // 过期时间
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  app
);
// 盐值
app.keys = ["111", "222", "333"];
// 注册一下这个中间件，这样一来 ctx 里就有一个 session 对象了
app.use(session);

const router = new KoaRouter({ prefix: "/user" });
router.get("/login", (ctx, next) => {
  // 假设这里服务端判断到登录接口走成功...

  /*
    服务端给客户端设置 session
      * session 名
      * session 值
      * session 过期时间（单位毫秒）
  */
  ctx.session.sessionId = "123456";

  // 服务端给客户端响应数据
  ctx.body = {
    code: 0,
    message: "登录成功",
  };
});
router.get("/info", (ctx, next) => {
  // 验证 sessionId
  const sessionId = ctx.session.sessionId;
  if (sessionId !== "123456") {
    ctx.body = {
      code: -2000,
      message: "登录凭证无效",
    };
    return;
  }

  ctx.body = {
    code: 0,
    message: "获取用户信息成功",
  };
});
app.use(router.routes());
app.use(router.allowedMethods());
