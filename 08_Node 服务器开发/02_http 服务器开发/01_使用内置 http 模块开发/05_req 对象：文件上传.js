// 第一步：导入 http 模块
const http = require("http");
// 解析 url 用的模块
const urlModule = require("url");
// 文件操作模块
const fs = require("fs");

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
  
  if (pathName === "/uploadPhoto") {
    if (method === "POST") {
      let boundary = req.headers["content-type"].split("; ")[1].replace("boundary=", "");
      let totalLength = req.headers["content-length"];
      let receivedLength = 0;
      let bodyString = "";

      // 1、创建一个可写流，专门用来写入某个文件
      const writeStream = fs.createWriteStream("./my_photo.jpg", {
        // 写入模式采用 a 或 a+，表示追加写入，因为客户端上传的文件可能超过 64KB，无法一次性写入，所以要追加
        flags: "a",
        // 设置写入缓冲区的大小为 64KB，默认 16KB，
        highWaterMark: 64 * 1024,
      });

      // POST 请求一般有请求体，传给服务器的一堆入参一般放在请求体里、而不是 URL 里
      // 我们前面已经说过 req 对象其实是一个 ReadableStream 对象，所以我们可以通过监听 req 对象的 data 事件来获取请求体里的数据。监听流的 data 事件，每当读取到数据时，就会触发该事件（正是因为 Stream 类继承自 EventEmitter 类）
      // 默认一次性能读取 64KB 的数据，但是文件的大小很有可能超过 64KB，所以需要拼接数据
      // 并且这里是图片、音频、视频、文件等那类需要直接用二进制数据的请求，而不是一个常规的登录请求之类，所以我们需要把读取到的数据保持二进制即 Buffer 对象，而不要搞成 JSON 字符串输出
      req.on("data", (chunk) => {
        // 用 "binary" 来解码 Buffer 对象里的二进制数据让它们打印成字母之类的东西
        bodyString += chunk.toString("binary");
        // 2、调用 write() 方法写入数据，可以多次调用，收到客户端的一部分数据就追加写入一部分
        // 因为要截取图片，所以这里就不分段写入了，而是截取完获得真正的图片数据后一次性写入
        // writeStream.write(chunk);

        receivedLength += chunk.length;
        res.write(`文件上传进度：${receivedLength / totalLength}\n`);
      });
      req.on("end", async () => {
        // 截取出文件本身的二进制数据
        const replacedRNBodyString = bodyString.replaceAll("\r\n", "");
        const replacedBoundaryBodyString = replacedRNBodyString.replaceAll(`--${boundary}--`, "");
        const photoStartIndex = replacedBoundaryBodyString.indexOf("image/jpeg") + "image/jpeg".length;
        const photoDataString = replacedBoundaryBodyString.substring(photoStartIndex);

        // 使用 Promise 包装写入这个异步操作
        await new Promise((resolve, reject) => {
          // 2、调用 write() 方法写入数据，
          // 现在 photoDataString 是 "binary" 解码后的字符串，所以需要用 "binary" 编码回二进制数据来写入
          writeStream.write(Buffer.from(photoDataString, 'binary'), (error) => {
            if (error) reject(error);
            else resolve();
          });
        });
        // 3、调用 end() 方法写入最后一波数据，与此同时它还会关闭文件（即关闭流）从而触发 finish 事件
        writeStream.end();
      });

      // 4、监听流的 finish 事件，当写入完成时，就会触发该事件
      writeStream.on("finish", () => {
        res.end("文件上传成功");
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

// 第五步：手动运行 http 服务器测试看看效果（实际部署的话，我们不需要手动运行，而是交给服务器自动运行，部署流程后面专门说）
// cd 到当前文件夹，执行“node 01_基本使用.js”命令，服务器就运行起来了
// 打开 Postman，访问 http://localhost:8000 或 http://127.0.0.1:8000（因为手动运行时服务器是跑在本地的，所以访问时是通过 localhost 或 127.0.0.1 来访问）就可以了
// 注意：通过 node 来手动运行，每次修改了服务器的代码后，都需要重新运行服务器，否则服务器不会自动更新
// 
// 所以为了让服务器能在修改代码后自动更新，我们可以使用 nodemon 工具来运行服务器
// 首先执行命令全局安装 nodemon：npm install nodemon -g
// 然后使用 nodemon 运行服务器：cd 到当前文件夹，执行“nodemon 01_基本使用.js”命令，服务器就运行起来了


// 注意点一：================================================================
// 文件上传的流程一般是：客户端上传一个文件，服务端收到数据后把文件保存到服务器上，供将来客户端访问使用
// 所以服务端需要创建一个可写流，把客户端上传的文件数据通过可写流写入到服务器上的某个文件中

// 注意点二：================================================================
// 客户端上传文件的请求体里一般会包含文件本身的二进制数据和一些其它信息（如文件名、文件类型、分隔符等）。为了能看到这些数据到底是什么内容，我们可以使用 "binary" 来解码 Buffer 对象里的二进制数据让它们打印成字母之类的东西，而不是纯纯打印 Buffer 对象的二进制，当然这只是为了我们打印调试看看而已，实际存储到文件里的数据还是 Buffer 对象的二进制。如果控制台打印不下这么多信息，我们可以不用 nodemon 来运行项目，而是用 run debug 来运行项目，就能看到完整打印了
// 
// 文件数据示例：
// ----------------------------260188246573861364080309
// Content-Disposition: form-data; name="photo"; filename="å°è¹æ.JPG"; filename*=UTF-8''%E5%B0%8F%E8%8B%B9%E6%9E%9C.JPG
// Content-Type: image/jpeg
// 
// 
// 文件本身的二进制数据
// 
// ----------------------------260188246573861364080309
// 
// 实际存储示例：
// ----------------------------260188246573861364080309\r\nContent-Disposition: form-data; name="photo"; filename="å°è¹æ.JPG"; filename*=UTF-8''%E5%B0%8F%E8%8B%B9%E6%9E%9C.JPG\r\nContent-Type: image/jpeg\r\n\r\n文件本身的二进制数据\r\n----------------------------260188246573861364080309--\r\n
// 
// 所以服务端在存储文件数据时，需要截取出文件本身的二进制数据存进文件里，而不能把请求体里所有的数据都存进文件里，否则文件是打不开的
// 那具体怎么截呢？我们这里就简单处理下，利用 "binary" 解码的后的字符串暴力截取出来存储看看效果（实际开发中我们都是用第三方库来处理，这里只是为了演示）