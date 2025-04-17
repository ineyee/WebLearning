const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

const userRouter = new KoaRouter({
  prefix: "/user",
});
userRouter.post("/login", (ctx, next) => {
  // 常见的请求头字段详见这篇文章：https://www.jianshu.com/p/27a32885fa7a

  console.log("请求头：", ctx.headers);
  console.log("请求头：", ctx.request.headers);
  
  ctx.body = {
    "code": 0,
    "message": "登录成功",
    "data": {
      "token": "1234567890",
    },
  };
});
app.use(userRouter.routes());