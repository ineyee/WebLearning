const Koa = require("koa");
const app = new Koa();

// 异步中间件
app.use(async (ctx, next) => {
  console.log("中间件 1 before next");

  next();

  console.log("中间件 1 after next");
});

// 异步中间件
app.use(async (ctx, next) => {
  console.log("中间件 2 before next");

  c
  await next();

  console.log("中间件 2 after next");
});

// 异步中间件
app.use(async (ctx, next) => {
  console.log("中间件 3 before next");

  next();
  // ctx.body = "Hello Koa";

  console.log("中间件 3 after next");
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 所谓异步中间件是指中间件函数是个异步函数而非同步函数
// 
// 打印现象：
// 中间件 1 before next
// 中间件 2 before next
// 中间件 1 after next
// 中间件 3 before next
// 中间件 3 after next
// 中间件 2 after next
// 
// koa 异步中间件执行机制：
// 1、先匹配并执行第一个中间件，所以先打印了“中间件 1 before next”
// 2、如果遇到了 next() 函数，就跳转去匹配并执行下一个中间件、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 2 before next"；但是因为当前中间件是个异步中间件，所以 next() 函数并不会等待下一个中间件的执行结果，而是会异步地继续执行当前中间件 next() 函数后的代码，所以接下来可能会打印"中间件 1 after next"、此时中间件 1 的生命周期就算走完了
// 3、如果下一个中间件也遇到了 next() 函数，则继续跳转去匹配并执行下一个中间件、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 3 before next"；并且虽然当前中间件是个异步中间件，但是 next() 函数用了 await 来卡主，所以 next() 函数还是会等待下一个中间件执行完而不会执行当前中间件 next() 函数后的代码、此时中间件  2 的生命周期还没走完
// 4、如果遇到 next() 函数后没有下一个中间件了或者调用了返回 ctx.body 给客户端返回响应，那就执行完当前中间件，然后返回上一层中间件，继续执行上一层中间件 next() 函数后的代码，所以接下来打印了“中间件 3 after next”、“中间件 2 after next”，就像函数嵌套调用释放调用栈那样一层一层释放


