const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const {
  verifyMomentParams,
} = require("../../middleware/moment/moment.middleware");
const momentController = require("../../controller/moment/moment.controller");

const router = new KoaRouter({
  prefix: "/moment",
});

// 发布动态
// 需要验证人的登录身份才能发布
router.post(
  "/createMoment",
  verifyToken,
  verifyMomentParams,
  momentController.createMoment
);

// 获取动态列表
// 此处设计为不需要登录就能查看动态，就像 B 站不需要登录也能看到视频列表那样
router.get("/getMomentList", momentController.getMomentList);

// 获取动态详情
// 这个是 http://xxx/getMomentDetail?momentId=1 这样请求
router.get("/getMomentDetail", momentController.getMomentDetail);
// 这个是 http://xxx/getMomentDetail/1 这样请求
router.get("/getMomentDetail/:momentId", momentController.getMomentDetail);

module.exports = router;
