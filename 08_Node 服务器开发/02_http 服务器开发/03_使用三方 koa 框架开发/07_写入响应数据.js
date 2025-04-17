const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  // 我们前面已经说过响应对象其实是一个 WritableStream 对象，所以我们可以通过响应对象来写入响应数据给客户端
  // 而 koa 中的 ctx.body 其实就 ctx.response.body，也就是响应体，所以我们可以直接通过 ctx.body 来写入响应数据给客户端
  // 
  // ctx.body 可以接收字符串、数组、jsonObj、二进制（Buffer 或 Stream）等数据，它都会自动处理
  // 比如当它接收到数组和 jsonObj 时，会自动将数组和 jsonObj 转换成 json 字符串，并设置响应头为 application/json，就不用我们自己转换数据了
  // 
  // ctx.body 也会自动关闭文件（即关闭流）来结束本次响应，否则客户端会一直处于等待状态，直到超时
  ctx.body = {
    "code": 200,
    "message": "请求成功",
    "data": {
      "name": "watson",
      "age": 20,
    },
  };
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});
