/*
  登录模块接口的路由配置

  路由配置（router）里只负责维护接口的请求路径和表现层中间件的映射关系
*/

// 第一步：导入 KoaRouter 模块
// 注意：KoaRouter 导出的是一个类而不是一个函数，所以这里我们用大驼峰来命名
const KoaRouter = require("@koa/router");
// 导入表现层中间件
const loginController = require("../../controller/user/login.controller");
// 导入中间件为表现层减负
const {
  verifyLoginParams,
  verifyToken,
} = require("../../middleware/user/login.middleware");

// 第二步：创建路由实例
// @koa/router 导出的是一个类而不是一个函数，所以得用 new 来创建实例
// 创建路由实例时，可以传入一个路径前缀，挂载路由时的请求路径会相对于这个路径前缀
const router = new KoaRouter({
  prefix: "/user",
});

// 第三步：在路由实例上挂载路由
// 这里的请求路径是相对于路径前缀的请求路径，所以这里的请求路径是：/user/login
//
// 我们把拆分后的逻辑抽取到专门的文件里去实现，【路由文件里只负责维护接口的请求路径和表现层中间件的映射关系】
// “/login”就是请求接口的路径，“loginController.login”就是请求接口的表现层中间件
router.post("/login", verifyLoginParams, loginController.login);
router.get("/info", verifyToken, (ctx, next) => {
  ctx.body = {
    code: 0,
    message: "获取用户信息成功",
    data: {
      id: ctx.tokenInfo.id,
      username: "假装我是根据 id 从数据库查到的 username",
      email: "假装我是根据 id 从数据库查到的 email",
      createTime: "假装我是根据 id 从数据库查到的 createTime",
      updateTime: "假装我是根据 id 从数据库查到的 updateTime",
    },
  };
});

// 第四步：导出路由实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = router;
