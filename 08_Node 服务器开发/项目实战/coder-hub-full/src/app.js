// 第一步：导入 koa 框架
// 注意：koa 框架导出的是一个类而不是一个函数，所以这里我们用大驼峰来命名
const Koa = require("koa");
// 导入 bodyParser 中间件来解析 post 请求的请求体
// 注意：koa-bodyparser 是 koa 框架的一个中间件——即一个函数，所以我们用小驼峰来命名
const bodyParser = require("koa-bodyparser");
// 导入自动注册路由
const registerRouters = require("./router/index.js");

// 第二步：创建一个 koa 服务器实例
// 约定俗成地我们会把这个服务器实例命名为 app
// 注意：koa 框架导出的是一个类而不是一个函数，所以这里需要用 new 关键字来创建实例
const app = new Koa();

// 第三步：在 app 服务器实例上使用中间件
// bodyParser 中间件必须写在路由中间件前面，因为 bodyParser 是用来解析 post 请求的请求体的，所以得先使用它，路由中间件里处理请求时才能正常解析 post 请求的请求体
app.use(bodyParser());
// 自动注册路由
registerRouters(app);

// 第四步：导出 app 服务器实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = app;
