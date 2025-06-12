// main.js 文件里只做两件事：
// 1、导入 app——即 koa 服务器实例
// 2、启动服务器

// 导入 app，默认导入法不需要写大括号
const app = require('./app.js');
// 导入服务器常量
const {SERVER_PORT} = require('./config/server.config.js');

// 指定要监听的端口并启动 koa 服务器
// 第一个参数：要监听的端口（即服务要部署在哪个端口上）
// 第二个参数：koa 服务器启动成功后的回调函数
// 
// 因为我们编写的这份代码（即服务）会部署在某个特定的服务器上（即主机），将来客户端访问时会通过 IP 地址或域名来找到相应的服务器，所以是不需要指定主机的，只需要指定端口即可
app.listen(SERVER_PORT, () => {
  console.log("🚀服务器启动成功🚀");
});






// coder-hub-register 这个项目只通过注册接口来演示整个项目的目录结构和架构设计，完整的项目见 coder-hub-full