// 前面我们使用内置 http 模块开发 http 服务器的时候，已经体会过自己实现文件上传有多麻烦了
// 
// 现在我们使用三方 express 框架开发 http 服务器的话，就不用自己实现文件上传了。express 官方已经给我们提供了一个文件上传的中间件：multer，我们直接用这个中间件来实现即可
// 
// 使用 multer 中间件实现文件上传的步骤：
// 1、安装 multer，cd 到项目根目录，执行命令：npm install multer
// 2. 导入 multer 模块
// 3. 创建 multer 实例
// 4. 使用 multer 中间件实现文件上传

const express = require("express");
const multer = require("multer");

const app = express();
// upload 这个 multer 实例不是中间件
const upload = multer({
  // 指定文件如何存储
  storage: multer.diskStorage({
    // 存储路径：这里存储在当前目录下的 uploads 文件夹里
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    // 文件名：这里使用时间戳拼上文件的原始名称
    filename: (req, file, callback) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// 这里我们就用到了一次性注册多个中间件
app.post(
  "/uploadPhotos",

  // upload.array(xxx) 这个函数才是中间件
  // 这里的 "files" 对应客户端 multipart/form-data 里文件的 key，可以自定义，但是一般都用 "files"，必须和客户端保持一致，否则上传不成功
  // upload.array(xxx) 中间件会去处理文件上传操作，并且在有结果后调用 next 函数，从而执行下一个中间件
  upload.array("files"),

  // 在这个中间件里我们就可以获取到文件上传的结果了
  // req.files 可以获取到上传文件的所有信息
  (req, res, next) => {
    console.log(req.files);
    res.end("多文件上传成功~");
  },
);

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});
