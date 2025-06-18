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

/*
动态表

```SQL 
CREATE TABLE IF NOT EXISTS `t_moment` (
  -- 主键、自增
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值，该字段还得唯一
  `content` VARCHAR(1000) NOT NULL,

  -- 必须与 t_user.id 类型一致
  `userId` BIGINT NOT NULL,
	
	-- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	`createTime` TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
	
	-- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	`updateTime` TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	
  -- 在 CREATE 语句的最后添加一个外键约束，含义为：
  -- 当前表中的外键 `userId`，引用的是 `t_user` 表中的 `id`
  -- ON UPDATE 和 ON DELETE 是指当我们删除或修改 t_user.id 时，t_moment 应该做出什么反应，默认情况下是这个值是 RESTRICT —— 即如果某个字段被外键关联着、那么在删除或修改这个字段时直接报错、也就是说不允许删除或修改；我们通常会手动设置为 CASCADE —— 即允许删除或修改这个字段、并且如果是删除这个字段那就跟随删除另外一张表里的数据、如果是修改这个字段那就跟随修改另外一张表里的数据
  FOREIGN KEY (`userId`) REFERENCES `t_user`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
```
*/
