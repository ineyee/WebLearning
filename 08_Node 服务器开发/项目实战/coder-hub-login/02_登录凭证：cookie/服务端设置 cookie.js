const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

const router = new KoaRouter({ prefix: "/user" });
router.get("/login", (ctx, next) => {
  // 假设这里服务端判断到登录接口走成功...

  /*
    服务端给客户端设置 cookie
      * cookie 名
      * cookie 值
      * cookie 过期时间（单位毫秒）
  */
  ctx.cookies.set("authId", "123456", {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // 服务端给客户端响应数据
  ctx.body = {
    code: 0,
    message: "登录成功",
  };
});
router.get("/info", (ctx, next) => {
  // 验证 cookie
  const cookie = ctx.cookies.get("authId");
  if (cookie !== "123456") {
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
