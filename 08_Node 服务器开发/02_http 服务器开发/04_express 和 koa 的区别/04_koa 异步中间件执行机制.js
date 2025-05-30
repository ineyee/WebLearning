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

  // 模拟耗时操作
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //  koa 里 next() 函数的返回值是个 Promise，所以可以用 await 来卡主
  await next();

  console.log("中间件 2 after next");
});

// 异步中间件
app.use(async (ctx, next) => {
  console.log("中间件 3 before next");

  // 模拟耗时操作
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
// 1、先匹配并执行第一个中间件——中间件 1，所以先打印了“中间件 1 before next”
// 2、如果遇到了 next() 函数，就跳转去匹配并调用下一个中间件——中间件 2、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 2 before next"；但是因为下一个中间件——中间件 2——是个异步中间件，所以 next() 函数并不会卡主当前中间件——中间件 1——来等待下一个中间件——中间件 2——的执行结果，而是会异步地继续执行当前中间件——中间件 1—— next() 函数后的代码，所以接下来可能会打印"中间件 1 after next"、此时中间件 1 的生命周期就算走完了
// 3、如果下一个中间件——中间件 2——也遇到了 next() 函数，则继续跳转去匹配并调用下一个中间件——中间件 3、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 3 before next"；不过虽然下一个中间件——中间件 3——是个异步中间件，但是当前中间件——中间件 2——里的 next 函数使用了 await，所以还是会卡主当前中间件——中间件 2——来等待下一个中间件——中间件 3——的执行结果，等到结果后才会继续执行当前中间件——中间件 2—— next() 函数后的代码、此时中间件 2 的生命周期还没走完
// 4、如果遇到 next() 函数后没有下一个中间件了或者调用了返回 ctx.body 给客户端返回响应，那就执行完当前中间件后续的代码，然后返回上一层中间件——中间件 2，继续执行上一层中间件——中间件 2——next() 函数后的代码，所以接下来打印了“中间件 3 after next”、“中间件 2 after next”，就像函数嵌套调用释放调用栈那样一层一层释放