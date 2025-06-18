/*
  moment 模块接口的路由配置
*/
const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const { verifyMomentParams } = require("../../middleware/moment/moment.middleware");

const router = new KoaRouter({
  prefix: "/moment",
});

router.post("/createMoment", verifyToken, verifyMomentParams, (ctx, next) => {
  ctx.body = {
    code: 0,
    message: "创建动态成功",
  };
});

module.exports = router;
