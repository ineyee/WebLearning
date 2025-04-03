// 客户端文件下载的本质其实就是：
// 服务端读取一段数据就发给客户端，然后继续读取下一段数据，再发给客户端，直到读取完毕
// 客户端收到一段数据就存储一段数据，直到收到全部数据

// 第一步：导入 http 模块
const http = require("http");
// 解析 url 用的模块
const urlModule = require("url");
// 解析 get 请求 url 里参数用的模块
const qsModule = require("querystring");
// 文件操作模块
const fs = require("fs");
// 路径处理模块
const path = require("path");

// 第二步：创建一个 http 服务器实例
const httpServer = http.createServer();

// 第三步：指定要监听的端口并启动 http 服务器
// 第一个参数：要监听的端口（即服务要部署在哪个端口上）
// 第二个参数：http 服务器启动成功后的回调函数
httpServer.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 第四步：监听来自客户端的请求并返回响应
// 第一个参数：请求事件（即客户端请求服务器时会触发该事件）
// 第二个参数：回调函数，回调函数中会传入两个参数，分别是请求对象（req）和响应对象（res）
//    请求对象（request）：本质就是一个 ReadableStream，用来读取客户端发过来的请求数据
//    响应对象（response）：本质就是一个 WritableStream，用来写入响应数据给客户端
httpServer.on("request", (req, res) => {
  const method = req.method;
  console.log("请求方法：", method);

  const urlString = req.url;
  const urlObj = urlModule.parse(urlString);
  const pathName = urlObj.pathname;
  console.log("请求路径：", pathName);
  
  if (pathName === "/downloadFile") {
    if (method === "GET") {
      // 获取要下载的文件名
      const qsString = urlObj.query;
      const qsObj = qsModule.parse(qsString);
      const fileName = qsObj.fileName;
      console.log("请求参数：", fileName);
      // 文件路径，这里假设文件都存放在 downloads 目录下
      const filePath = `./${fileName}`;
      
      // 检查文件是否存在
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // 文件不存在，返回 404
          res.statusCode = 404;
          res.end(JSON.stringify({
            "code": 404,
            "message": "File Not Found"
          }));
          return;
        }

        // 获取文件信息，主要是为了获取文件大小
        fs.stat(filePath, (err, stats) => {
          if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({
              "code": 500,
              "message": "Internal Server Error"
            }));
            return;
          }
          
          // 设置响应头
          // 1. 设置内容类型，根据文件扩展名确定 MIME 类型
          const ext = path.extname(fileName).toLowerCase();
          let contentType = "application/octet-stream"; // 默认二进制流
          
          // 根据文件扩展名设置不同的 Content-Type
          switch (ext) {
            case ".html":
              contentType = "text/html";
              break;
            case ".css":
              contentType = "text/css";
              break;
            case ".js":
              contentType = "application/javascript";
              break;
            case ".json":
              contentType = "application/json";
              break;
            case ".jpg":
            case ".jpeg":
              contentType = "image/jpeg";
              break;
            case ".png":
              contentType = "image/png";
              break;
            case ".gif":
              contentType = "image/gif";
              break;
            case ".txt":
              contentType = "text/plain";
              break;
            case ".pdf":
              contentType = "application/pdf";
              break;
          }
          
          // 2. 设置内容长度
          res.setHeader("Content-Length", stats.size);
          
          // 3. 设置内容处理方式
          // Content-Disposition: attachment 表示作为附件下载
          // filename 参数指定下载后的文件名
          res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`);
          
          // 4. 设置内容类型
          res.setHeader("Content-Type", contentType);
          
          // 创建可读流
          const readStream = fs.createReadStream(filePath);
          
          // 监听可读流的错误事件
          readStream.on("error", (err) => {
            console.error("读取文件出错：", err);
            res.statusCode = 500;
            res.end(JSON.stringify({
              "code": 500,
              "message": "Error Reading File"
            }));
          });
          
          // 将可读流通过管道连接到响应对象（可写流）
          // res 对象本质上是一个 WritableStream，所以可以直接用 pipe 方法
          // pipe 方法会自动处理背压（backpressure）问题
          readStream.pipe(res);
          
          // 也可以不使用 pipe，而是手动处理数据流
          /*
          readStream.on("data", (chunk) => {
            // 写入数据到响应对象
            // 如果 res.write() 返回 false，表示缓冲区已满，需要等待 drain 事件
            const canContinue = res.write(chunk);
            if (!canContinue) {
              // 暂停读取
              readStream.pause();
              
              // 当缓冲区清空后，继续读取
              res.once("drain", () => {
                readStream.resume();
              });
            }
          });
          
          readStream.on("end", () => {
            // 结束响应
            res.end();
            console.log("文件下载完成");
          });
          */
        });
      });
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({
        "code": 405,
        "message": "Method Not Allowed"
      }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      "code": 404,
      "message": "Not Found"
    }));
  }
});

// 第五步：手动运行 http 服务器测试看看效果
// cd 到当前文件夹，执行"node 09_res 对象_文件下载.js"命令，服务器就运行起来了
// 打开浏览器，访问 http://localhost:8000/downloadFile?fileName=example.txt 就可以下载文件了
// 或者使用 nodemon 运行服务器：cd 到当前文件夹，执行"nodemon 09_res 对象_文件下载.js"命令 

// 注意点一：================================================================
// 文件下载的流程一般是：客户端请求下载某个文件，服务端读取该文件并将文件数据作为响应体发送给客户端
// 所以服务端需要创建一个可读流，把服务器上的文件数据通过可读流读取出来，然后通过响应对象（可写流）写入给客户端

// 注意点二：================================================================
// 为了让浏览器将响应内容作为文件下载而不是直接在浏览器中显示，需要设置 Content-Disposition 响应头为 attachment
// 同时可以通过 filename 参数指定下载后的文件名

// 注意点三：================================================================
// 使用 pipe() 方法可以自动处理背压问题，确保大文件下载时不会占用过多内存
// 如果不使用 pipe()，则需要手动处理背压问题，即当写入缓冲区已满时暂停读取，等缓冲区清空后再继续读取

// 注意点四：================================================================
// 对于大文件下载，使用流式处理可以有效减少内存占用，提高服务器性能
// 如果使用 fs.readFile() 一次性读取整个文件再发送，对于大文件会占用大量内存