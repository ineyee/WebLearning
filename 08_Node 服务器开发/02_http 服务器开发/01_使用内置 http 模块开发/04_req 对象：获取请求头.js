// 第一步：导入 http 模块
const http = require("http");
// 解析 url 用的模块
const urlModule = require("url");
// 解析表单提交数据用的模块
const qsModule = require("querystring");

// 第二步：创建一个 http 服务器实例
const httpServer = http.createServer();

// 第三步：指定要监听的端口并启动 http 服务器
// 第一个参数：要监听的端口（即服务要部署在哪个端口上）
// 第二个参数：http 服务器启动成功后的回调函数
// 
// 因为我们编写的这份代码（即服务）会部署在某个特定的服务器上（即主机），将来客户端访问时会通过 IP 地址或域名来找到相应的服务器，所以是不需要指定主机的，只需要指定端口即可
httpServer.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 第四步：监听来自客户端的请求并返回响应
// 第一个参数：请求事件（即客户端请求服务器时会触发该事件）
// 第二个参数：回调函数，回调函数中会传入两个参数，分别是请求对象（req）和响应对象（res）
//    请求对象（request）：本质就是一个 ReadableStream，用来读取客户端发过来的请求数据。包含了客户端请求服务器时的所有信息，如请求方法、请求路径、请求头、请求体等
//    响应对象（response）：本质就是一个 WritableStream，用来写入响应数据给客户端。包含了服务器要返回给客户端的所有信息，如响应状态码、响应头、响应体等
httpServer.on("request", (req, res) => {
  // 常见的请求头字段详见这篇文章：https://www.jianshu.com/p/27a32885fa7a
  console.log("请求头：", req.headers);

  const urlString = req.url;
  const urlObj = urlModule.parse(urlString);
  const pathName = urlObj.pathname;
  if (pathName === "/login") {
    let jsonObj = {};
    req.on("data", (chunk) => {
      const jsonString = chunk.toString();
      console.log("解析前请求参数", jsonString);
      
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") { // 表单提交
        jsonObj = qsModule.parse(jsonString);
      } else if (req.headers["content-type"] === "application/json") { // JSON 提交
        jsonObj = JSON.parse(jsonString);
      }
      console.log("解析后请求参数：", jsonObj.username, jsonObj.password);
    });
    req.on("end", () => {
      if (jsonObj.username === "watson" && jsonObj.password === "123456") {
        res.end(JSON.stringify({
          "code": 200,
          "message": "登录成功",
          "data": {
            "token": "1234567890",
          },
        }));
      } else {
        res.end(JSON.stringify({
          "code": 200,
          "message": "登录失败",
          "data": {
            "msg": "请检查用户名或密码是否正确",
          },
        }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      "code": 404,
      "message": "Not Found"
    }));
  }
});

// 第五步：手动运行 http 服务器测试看看效果（实际部署的话，我们不需要手动运行，而是交给服务器自动运行，部署流程后面专门说）
// cd 到当前文件夹，执行“node 01_基本使用.js”命令，服务器就运行起来了
// 打开 Postman，访问 http://localhost:8000 或 http://127.0.0.1:8000（因为手动运行时服务器是跑在本地的，所以访问时是通过 localhost 或 127.0.0.1 来访问）就可以了
// 注意：通过 node 来手动运行，每次修改了服务器的代码后，都需要重新运行服务器，否则服务器不会自动更新
// 
// 所以为了让服务器能在修改代码后自动更新，我们可以使用 nodemon 工具来运行服务器
// 首先执行命令全局安装 nodemon：npm install nodemon -g
// 然后使用 nodemon 运行服务器：cd 到当前文件夹，执行“nodemon 01_基本使用.js”命令，服务器就运行起来了
