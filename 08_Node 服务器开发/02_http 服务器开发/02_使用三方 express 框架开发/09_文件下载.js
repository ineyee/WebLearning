const express = require("express");
const app = express();
// 文件操作模块
const fs = require("fs");
// 路径处理模块
const path = require("path");

// 定义下载文件的路由
app.get("/downloadFile", (req, res) => {
  // 获取要下载的文件名
  const fileName = req.query.fileName;
  console.log("请求参数：", fileName);
  
  if (!fileName) {
    return res.status(400).json({
      "code": 400,
      "message": "缺少文件名参数"
    });
  }
  
  // 文件路径，这里假设文件都存放在当前目录下
  const filePath = `./${fileName}`;
  
  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 文件不存在，返回 404
      return res.status(404).json({
        "code": 404,
        "message": "文件不存在"
      });
    }

    // 获取文件信息，主要是为了获取文件大小
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return res.status(500).json({
          "code": 500,
          "message": "服务器内部错误"
        });
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
      
      // 创建可读流并通过管道连接到响应对象
      const readStream = fs.createReadStream(filePath);
      
      // 监听可读流的错误事件
      readStream.on("error", (err) => {
        console.error("读取文件出错：", err);
        // 如果已经发送了一部分数据，这里可能会导致错误，但我们仍然尝试发送错误响应
        if (!res.headersSent) {
          res.status(500).json({
            "code": 500,
            "message": "读取文件出错"
          });
        } else {
          res.end();
        }
      });
      
      // 将可读流通过管道连接到响应对象（可写流）
      readStream.pipe(res);
    });
  });
});