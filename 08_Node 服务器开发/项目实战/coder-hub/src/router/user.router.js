/*
  用户模块接口的路由配置

  路由配置（router）里只负责维护接口的请求路径和表现层中间件的映射关系
*/

// 第一步：导入 KoaRouter 模块
// 注意：KoaRouter 导出的是一个类而不是一个函数，所以这里我们用大驼峰来命名
const KoaRouter = require("@koa/router");
// 导入表现层中间件
const userController = require("../controller/user.controller");

// 第二步：创建路由实例
// @koa/router 导出的是一个类而不是一个函数，所以得用 new 来创建实例
// 创建路由实例时，可以传入一个路径前缀，挂载路由时的请求路径会相对于这个路径前缀
const router = new KoaRouter({
  prefix: "/user",
});

// 第三步：在路由实例上挂载路由
// 这里的请求路径是相对于路径前缀的请求路径，所以这里的请求路径是：/user/register
// 
// 写法一：我们可以把注册接口的所有逻辑都写在 (ctx, next) => {...} 这个中间件里，没毛病
// 但是如果逻辑太多的话，这个中间件就会过于臃肿，难以维护
// 再进一步，当这个模块里的接口越来越多时，这个模块的代码就会越来越臃肿，难以维护
// 所以我们考虑把所有逻辑拆分成表现层逻辑、业务层逻辑、数据层逻辑，然后把这些逻辑分别抽取到专门的文件里去实现
// router.post("/register", (ctx, next) => {
//   // 1、接收客户端的请求参数
//   // bodyParser 中间件内部就是在解析 post 请求体里的数据，解析成 jsonObj 后，会把 jsonObj 赋值给 ctx.request.body 属性
//   const params = ctx.request.body;
//   console.log("请求参数：", params);
  
//   // 2、对客户端的请求参数进行有效性校验
//   // 2.1 参数校验失败，返回错误信息
//   // 2.2 参数校验成功，执行后续逻辑

//   // 3、将用户传递过来的参数存储到数据库中
//   // 3.1 存储数据库操作失败，返回错误信息
//   // 3.2 存储数据库操作成功，执行后续逻辑

//   // 4、将注册成功的结果返回给客户端
//   ctx.body = {
//     code: 200,
//     message: "注册成功",
//   };
// });
// 
// 写法二：我们把拆分后的逻辑抽取到专门的文件里去实现，【路由文件里只负责维护接口的请求路径和表现层中间件的映射关系】
// “/register”就是请求接口的路径，“userController.register”就是请求接口的表现层中间件
router.post("/register", userController.register);

// 第四步：导出路由实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = router;
