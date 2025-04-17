const KoaRouter = require("@koa/router");
const router = new KoaRouter({
  prefix: "/song",
});

router.get("/list", (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "获取歌曲列表成功",
  };
});

router.get("/detail", (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "获取歌曲详情成功",
  };
});

module.exports = router;
