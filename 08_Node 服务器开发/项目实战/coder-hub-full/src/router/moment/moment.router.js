const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const {
  verifyMomentParams,
  verifyMomentPermission,
  verifyMomentsPermission,
} = require("../../middleware/moment/moment.middleware");
const momentController = require("../../controller/moment/moment.controller");

const router = new KoaRouter({
  prefix: "/moment",
});

// 发布动态
// 得验证登录身份
router.post(
  "/createMoment",
  verifyToken,
  verifyMomentParams,
  momentController.createMoment
);

// 获取动态列表
// 此处设计为不需要登录就能查看动态列表，就像 B 站不需要登录也能看到视频列表那样
router.get("/getMomentList", momentController.getMomentList);

// 获取动态详情
// 此处设计为不需要登录就能查看动态列表，就像 B 站不需要登录也能看到视频详情那样
// 这个是 http://xxx/getMomentDetail?momentId=1 这样请求
router.get("/getMomentDetail", momentController.getMomentDetail);
// 这个是 http://xxx/getMomentDetail/1 这样请求
router.get("/getMomentDetail/:momentId", momentController.getMomentDetail);

// 删除动态
// 得验证登录身份 + 只能删除自己的状态（即管理权限校验，扩展开来思考的话就是一个系统里管理员身份、成员身份那种管理权限校验）
// 其它参数严谨来说验证一下最好，但是不想验证的话也无伤大雅，只去做那些关键的验证就行了，其它的靠接口文档约束也行，因为客户端也会做好很多校验工作
router.post(
  "/deleteMoment",
  verifyToken,
  verifyMomentPermission,
  momentController.deleteMoment
);
router.post(
  "/batchDeleteMoment",
  verifyToken,
  verifyMomentsPermission,
  momentController.batchDeleteMoment
);

// 修改动态
// 得验证登录身份 + 只能修改自己的状态（即管理权限校验，扩展开来思考的话就是一个系统里管理员身份、成员身份那种管理权限校验）
// 其它参数严谨来说验证一下最好，但是不想验证的话也无伤大雅，只去做那些关键的验证就行了，其它的靠接口文档约束也行，因为客户端也会做好很多校验工作
router.post(
  "/updateMoment",
  verifyToken,
  verifyMomentPermission,
  momentController.updateMoment
);

module.exports = router;
