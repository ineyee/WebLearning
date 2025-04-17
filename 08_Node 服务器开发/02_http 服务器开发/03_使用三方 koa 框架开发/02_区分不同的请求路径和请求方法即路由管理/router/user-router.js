// 2、专属于用户模块接口的路由文件

const KoaRouter = require("@koa/router");

// 3、创建路由实例
// @koa/router 导出的是一个类而不是一个函数，所以得用 new 来创建实例
// 创建路由实例时，可以传入一个路径前缀，挂载路由时的请求路径会相对于这个路径前缀
const router = new KoaRouter({
  prefix: "/user",
});

// 4、在路由实例上挂载路由
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

// 5、导出路由实例
module.exports = router;
