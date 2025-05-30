const express = require("express");
const app = express();

// 同步中间件
app.use((req, res, next) => {
  console.log("中间件 1 before next");

  next();

  console.log("中间件 1 after next");
});

// 同步中间件
app.use((req, res, next) => {
  console.log("中间件 2 before next");

  next();

  console.log("中间件 2 after next");
});

// 同步中间件
app.use((req, res, next) => {
  console.log("中间件 3 before next");

  // next();
  res.json({
    code: 200,
    message: "Hello Express"
  });

  console.log("中间件 3 after next");
});

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 所谓同步中间件是指中间件函数是个同步函数而非异步函数
// 
// 打印现象：
// 中间件 1 before next
// 中间件 2 before next
// 中间件 3 before next
// 中间件 3 after next
// 中间件 2 after next
// 中间件 1 after next
// 
// express 同步中间件执行机制：
// 1、先匹配并执行第一个中间件——中间件 1，所以先打印了“中间件 1 before next”
// 2、如果遇到了 next() 函数，就跳转去匹配并调用下一个中间件——中间件 2、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 2 before next"；并且因为下一个中间件——中间件 2——是个同步中间件，所以 next() 函数会卡主当前中间件——中间件 1——来等待下一个中间件——中间件 2——的执行结果，等到结果后才会继续执行当前中间件——中间件 1—— next() 函数后的代码
// 3、如果下一个中间件——中间件 2——也遇到了 next() 函数，则继续跳转去匹配并调用再下一个中间件——中间件 3、就像函数嵌套调用跳转那样，所以接下来打印了"中间件 3 before next"
// 4、如果遇到 next() 函数后没有下一个中间件了或者给客户端返回响应了，那就执行完当前中间件——中间件 3——后续的代码，然后返回上一层中间件——中间件 2，继续执行上一层中间件——中间件 2—— next() 函数后的代码，所以接下来打印了“中间件 3 after next”、“中间件 2 after next”、“中间件 1 after next”，就像函数嵌套调用释放调用栈那样一层一层释放


