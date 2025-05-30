// 当我们使用路由管理时，每个模块的接口都写在单独的文件——模块——里，然后通过路由来管理这些接口
// 这样可以让 app 对象保持简洁，有利于维护
// 
// 路由管理的使用步骤：
// 1、安装路由管理库 @koa/router，cd 到项目根目录，执行命令：npm install @koa/router
// 2、创建专属于某个模块接口的路由文件
// 3、在路由文件中创建路由实例
// 4、在路由文件中的路由实例上挂载路由
// 5、在路由文件中导出路由实例
// ------
// 6、在 app 对象所在的文件中引入路由文件
// 7、在 app 对象上使用路由

const Koa = require("koa");
const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 6、在 app 对象所在的文件中引入路由文件
const userRouter = require("./router/user-router");
const songRouter = require("./router/song-router");

// 7、在 app 对象中使用路由
app.use(userRouter.routes());
// allowedMethods() 是 koa-router 提供的一个中间件方法，建议在每个路由后面都跟一个
// 
// 如果不使用这个中间件，那么当客户端发送不支持的 HTTP 方法时：
// - 默认返回 404 Not Found（错误信息不准确）
// - 无 Allow 头（客户端不知道可用方法）
// 
// 使用这个中间件，那么当客户端发送不支持的 HTTP 方法时：
// - 返回 405 Method Not Allowed（精准状态码）
// - 携带 Allow: GET, POST... 头（自文档化）
app.use(userRouter.allowedMethods());

app.use(songRouter.routes());
app.use(songRouter.allowedMethods());


