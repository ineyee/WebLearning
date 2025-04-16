// 当我们使用路由管理时，每个模块的接口都写在单独的文件——模块——里，然后通过路由来管理这些接口
// 这样可以让 app 对象保持简洁，有利于维护
// 
// 路由管理的使用步骤：
// 1、创建专属于某个模块接口的路由文件
// 2、在路由文件中创建路由实例
// 3、在路由文件中的路由实例上挂载路由
// 4、在路由文件中导出路由实例
// ------
// 5、在 app 对象所在的文件中引入路由文件
// 6、在 app 对象上使用路由

const express = require("express");
const app = express();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 5、在 app 对象所在的文件中引入路由文件
const userRouter = require("./router/user-router");
const songRouter = require("./router/song-router");

// 6、在 app 对象中使用路由
app.use("/user", userRouter);
app.use("/song", songRouter);


