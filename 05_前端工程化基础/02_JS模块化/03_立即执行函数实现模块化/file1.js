// 我们可以使用立即执行函数来实现模块化，因为函数有自己的作用域
// 立即执行函数需要返回一个map，把我们想暴露给外界使用的变量和函数都返回出去，以便外界能访问到
const module1 = (function () {
  const personName = "张三";

  function run() {
    console.log(`${personName} run`);
  }

  return {
    personName: personName,
    run: run,
  };
}());