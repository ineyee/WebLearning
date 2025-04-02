// 第一步：导入 http 模块
const http = require("http");
// 解析 url 用的模块
const urlModule = require("url");
// 解析 get 请求 url 里参数用的模块
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
  const method = req.method;
  console.log("请求方法：", method);

  const urlString = req.url;
  const urlObj = urlModule.parse(urlString);
  const pathName = urlObj.pathname;
  console.log("请求路径：", pathName);

  if (pathName === "/login") {
    if (method === "POST") {
      let jsonObj = {};

      // POST 请求一般有请求体，传给服务器的一堆入参一般放在请求体里、而不是 URL 里
      // 我们前面已经说过 req 对象其实是一个 ReadableStream 对象，所以我们可以通过监听 req 对象的 data 事件来获取请求体里的数据。监听流的 data 事件，每当读取到数据时，就会触发该事件（正是因为 Stream 类继承自 EventEmitter 类）
      // 默认一次性能读取 64KB 的数据，一般的请求能一次性读取完，所以就不用拼接数据了
      // 并且这里是一个常规的登录请求，而不是图片、音频、视频、文件等那类需要直接用二进制数据的请求，所以我们可以把读取到的数据搞成 JSON 字符串输出（默认用的是 utf-8 解码），因为常规请求一般传输的都是 JSON 字符串而不是直接的二进制数据
      req.on("data", (chunk) => {
        const jsonString = chunk.toString();
        jsonObj = JSON.parse(jsonString);
        console.log("请求参数：", jsonObj);
      });
      // 监听流的 end 事件，当读取数据完毕后，就会触发该事件
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
      res.end(JSON.stringify({
        "code": 405,
        "message": "Method Not Allowed"
      }));
    }
  } else if (pathName === "/songList") {
    if (method === "GET") {
      // GET 请求一般没有请求体，传给服务器的一堆入参一般直接放在 URL 里
      const qsString = urlObj.query;
      const qsObj = qsModule.parse(qsString);
      console.log("请求参数：", qsObj);

      res.end(JSON.stringify({
        "code": 200,
        "message": "获取歌单成功",
        "data": {
          "id": qsObj.id,
          "page": qsObj.page,
          "size": qsObj.size,
        },
      }));
    } else {
      res.end(JSON.stringify({
        "code": 405,
        "message": "Method Not Allowed"
      }));
    }
  } else {
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
