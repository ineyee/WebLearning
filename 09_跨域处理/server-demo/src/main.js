const Koa = require("koa");
const KoaRouter = require("@koa/router");

const app = new Koa();
app.listen("8000", () => {
  console.log("🚀服务器启动成功🚀");
});

// 编写一个接口供前端调用
const router = new KoaRouter({
  prefix: "/moment",
});
router.get("/getMomentList", (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: "success",
    data: [
      { id: 1, content: "这是第一条动态" },
      { id: 2, content: "这是第二条动态" },
      { id: 3, content: "这是第二条动态" },
    ],
  };
});
app.use(router.routes());
app.use(router.allowedMethods());