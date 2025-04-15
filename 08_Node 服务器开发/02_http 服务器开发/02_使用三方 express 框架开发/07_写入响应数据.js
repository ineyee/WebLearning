const express = require("express");
const app = express();

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 方式1：使用 json() 方法
app.get("/method1", (req, res, next) => {
  // 我们前面已经说过 res 对象其实是一个 WritableStream 对象，所以我们可以通过 res 对象的 json() 方法来写入响应数据给客户端
  // 
  // 这种方式一般用于返回 json 格式的数据给客户端，实际中更常用
  // json() 方法会自动将 jsonObj 转换成 json 字符串，并设置响应头为 application/json，就不用我们自己转换数据了
  // 
  // json() 方法类似于 end() 方法，它也会关闭文件（即关闭流）来结束本次响应，否则客户端会一直处于等待状态，直到超时
  res.status(200).json({
    "code": 200,
    "message": "请求成功",
    "data": {
      "name": "watson",
      "age": 20,
    },
  });
});

// 方式2：使用 write() 方法、end() 方法
app.get("/method2", (req, res, next) => {
  // 我们前面已经说过 res 对象其实是一个 WritableStream 对象，所以我们可以通过 res 对象的 write() 方法和 end() 方法来写入响应数据给客户端
  // 
  // 这种方式一般用于返回二进制数据给客户端，实际中用的不多
  // write() 方法一般用于中途写入数据，可以多次调用
  // end() 方法一般用于写入最后一波数据，与此同时它还会关闭文件（即关闭流）
  // 默认一次性能写入 16KB 的数据，所以一些简单的响应就不用拼接数据了
  // 
  // 注意：在给客户端返回响应时，我们务必要调用一下 end() 方法来结束本次响应，否则客户端会一直处于等待状态，直到超时
  // 这也是为什么客户端在发送请求时，一般都会指定超时时长的原因，就是为了避免万一服务器出错迟迟不结束响应，导致用户一直等待
  res.status(200).write("Hello");
  res.status(200).write("World");
  res.status(200).end();
});
