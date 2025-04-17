const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  // 常见的响应状态码详见这篇文章：https://www.jianshu.com/p/27a32885fa7a

  ctx.status = 200;
  ctx.body = "请求成功";
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});