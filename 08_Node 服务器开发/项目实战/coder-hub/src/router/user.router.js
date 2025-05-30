/*
  专属于用户模块接口的路由文件
*/
// 第一步：导入 KoaRouter 模块
// 注意：KoaRouter 导出的是一个类而不是一个函数，所以这里我们用大驼峰来命名
const KoaRouter = require("@koa/router");

// 第二步：创建路由实例
// @koa/router 导出的是一个类而不是一个函数，所以得用 new 来创建实例
// 创建路由实例时，可以传入一个路径前缀，挂载路由时的请求路径会相对于这个路径前缀
const router = new KoaRouter({
  prefix: "/user",
});

// 第三步：在路由实例上挂载路由
// 这里的请求路径是相对于路径前缀的请求路径，所以这里的请求路径是：/user/login
router.post("/login", (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "登录成功",
  };
});

router.get("/info", (ctx, next) => {
  ctx.body = {
    code: 200,
    message: "获取用户信息成功",
  };
});

// 第四步：导出路由实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = router;
