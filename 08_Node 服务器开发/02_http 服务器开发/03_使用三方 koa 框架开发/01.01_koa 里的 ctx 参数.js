const Koa = require("koa");
const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});
 
// express 框架的中间件函数接收三个参数，req 对象和 res 对象是两个独立的参数
// 而 koa 框架的中间件函数只接收两个参数，请求对象和响应对象都被封装进 ctx 对象里了。因为 koa 认为一次 http 请求必然同时包含请求和响应，所以就设定一次 http 请求对应一个 ctx 对象————里面既包含请求对象、也包含响应对象
app.use((ctx, next) => {
  // 1、请求对象有两个：request 和 req
  console.log(ctx.request); // Koa 框架封装的请求对象，里面的参数较少但都是最常用的，所以实际开发中我们更多的是在用这个请求对象
  // console.log(ctx.req); // Node 框架原生封装的请求对象，就是 http 模块和 express 框架里的那个 req 对象，里面的参数很全但实际开发中我们用的较少，所以一般不使用这个请求对象
  
  ctx.body = "Hello Koa!";

  // 2、响应对象有两个：response 和 res
  console.log(ctx.response); // Koa 框架封装的请求对象，里面的参数较少但都是最常用的，所以实际开发中我们更多的是在用这个请求对象
  // console.log(ctx.res); // Node 框架原生封装的响应对象，就是 http 模块和 express 框架里的那个 res 对象，里面的参数很全但实际开发中我们用的较少，所以一般不使用这个响应对象

  // 3、Koa 还把 request 对象里的很多属性直接在 ctx 上引用了一份，方便我们直接使用，而不用去 ctx.request.xxx 这样写
  // 比如请求参数
  console.log(ctx.request.query === ctx.query); // true
  console.log(ctx.request.query);
  console.log(ctx.query);

  // 4、Koa 还把 response 对象里的很多属性直接在 ctx 上引用了一份，方便我们直接使用，而不用去 ctx.response.xxx 这样写
  // 比如响应体（注意：ctx 的 body 属性可不是请求体、而是响应体，即引用的是 response 对象的 body 属性而不是 request 对象的 body 属性）
  console.log(ctx.response.body === ctx.body); // true
  console.log(ctx.response.body);
  console.log(ctx.body);
});
