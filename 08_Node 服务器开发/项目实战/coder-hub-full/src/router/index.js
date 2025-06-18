const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  // 读取 router 文件夹
  const routerDir = path.join(__dirname, "./");
  // 读取 router 文件夹下所有的文件夹
  const routerSubDirs = fs.readdirSync(routerDir).filter((dir) => {
    return !dir.endsWith(".js");
  });
  // 遍历所有文件夹下的所有文件
  routerSubDirs.forEach((routerSubDir) => {
    const routerFiles = fs.readdirSync(path.join(routerDir, routerSubDir));
    routerFiles.forEach((routerFile) => {
      if (routerFile.endsWith(".router.js")) {
        const routerFilePath = path.join(routerDir, routerSubDir, routerFile);
        const router = require(routerFilePath);

        // 注册路由
        app.use(router.routes());
        // allowedMethods() 是 koa-router 提供的一个中间件方法，建议在每个路由中间件后面都跟一个
        //
        // 如果不使用这个中间件，那么当客户端发送不支持的 HTTP 方法时：
        // - 默认返回 404 Not Found（错误信息不准确）
        // - 无 Allow 头（客户端不知道可用方法）
        //
        // 使用这个中间件，那么当客户端发送不支持的 HTTP 方法时：
        // - 返回 405 Method Not Allowed（精准状态码）
        // - 携带 Allow: GET, POST... 头（自文档化）
        app.use(router.allowedMethods());
      }
    });
  });
};
