const Koa = require("koa");
const Router = require("@koa/router");
// 文件操作模块
const fs = require("fs");
// 路径处理模块
const path = require("path");

const app = new Koa();
const router = new Router();

// 定义下载文件的路由
router.get("/downloadFile", async (ctx) => {
  // 获取要下载的文件名
  const fileName = ctx.query.fileName;
  console.log("请求参数：", fileName);
  
  if (!fileName) {
    ctx.status = 400;
    ctx.body = {
      "code": 400,
      "message": "缺少文件名参数"
    };
    return;
  }
  
  // 文件路径，这里假设文件都存放在当前目录下
  const filePath = `./${fileName}`;
  
  // 检查文件是否存在
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (err) {
    // 文件不存在，返回 404
    ctx.status = 404;
    ctx.body = {
      "code": 404,
      "message": "文件不存在"
    };
    return;
  }

  // 获取文件信息，主要是为了获取文件大小
  try {
    const stats = await fs.promises.stat(filePath);
    
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
    ctx.set("Content-Length", stats.size);
    
    // 3. 设置内容处理方式
    // Content-Disposition: attachment 表示作为附件下载
    // filename 参数指定下载后的文件名
    ctx.set("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`);
    
    // 4. 设置内容类型
    ctx.set("Content-Type", contentType);
    
    // 创建可读流
    const readStream = fs.createReadStream(filePath);
    
    // 设置响应体为可读流
    // Koa 会自动处理流传输和错误处理
    ctx.body = readStream;
    
    // 为可读流添加错误处理（虽然 Koa 会自动处理，但添加自定义逻辑更可靠）
    readStream.on("error", (err) => {
      console.error("读取文件出错：", err);
      // 注意：一旦流开始发送，就不能再修改状态码或响应头
      // 所以这里只记录错误，不尝试发送错误响应
    });
    
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      "code": 500,
      "message": "服务器内部错误"
    };
  }
});

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Server Error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      code: ctx.status,
      message: err.message || '服务器内部错误'
    };
  }
});

// 启动服务器
const port = 8000;
app.listen(port, () => {
  console.log(`🚀服务器启动成功，访问 http://localhost:${port} 体验文件下载🚀`);
});