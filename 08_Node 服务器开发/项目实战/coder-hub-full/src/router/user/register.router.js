/*
  注册模块接口的路由配置

  路由配置（router）里只负责维护接口的请求路径和表现层中间件的映射关系
*/

// 第一步：导入 KoaRouter 模块
// 注意：KoaRouter 导出的是一个类而不是一个函数，所以这里我们用大驼峰来命名
const KoaRouter = require("@koa/router");
// 导入表现层中间件
const registerController = require("../../controller/user/register.controller");
// 导入中间件为表现层减负
const {
  verifyRegisterParams,
} = require("../../middleware/user/register.middleware");

// 第二步：创建路由实例
// @koa/router 导出的是一个类而不是一个函数，所以得用 new 来创建实例
// 创建路由实例时，可以传入一个路径前缀，挂载路由时的请求路径会相对于这个路径前缀
const router = new KoaRouter({
  prefix: "/user",
});

// 第三步：在路由实例上挂载路由
// 这里的请求路径是相对于路径前缀的请求路径，所以这里的请求路径是：/user/register
//
// 我们把拆分后的逻辑抽取到专门的文件里去实现，【路由文件里只负责维护接口的请求路径和表现层中间件的映射关系】
// “/register”就是请求接口的路径，“registerController.register”就是请求接口的表现层中间件
router.post("/register", verifyRegisterParams, registerController.register);

// 第四步：导出路由实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = router;

/*
用户表
```SQL
CREATE TABLE IF NOT EXISTS `t_user` (
  -- 主键、自增
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值，该字段还得唯一
  `email` VARCHAR(100) NOT NULL UNIQUE,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值
  `username` VARCHAR(100) NOT NULL,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值
  `password` VARCHAR(100) NOT NULL,
	
	-- 该字段我们定义为非必传，即 BIGINT 类型而非 BIGINT? 类型，因此我们需要提供默认值
	`createTime` BIGINT DEFAULT(0),
	
	-- 该字段我们定义为非必传，即 BIGINT 类型而非 BIGINT? 类型，因此我们需要提供默认值
	`updateTime` BIGINT DEFAULT(0)
);
```
*/
