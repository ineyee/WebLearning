const personName = "张三";
const _personAge = 18;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 导出方式一：export整体导出法（比较常用）
// 这里的{}可不是一个map，而是一个专门用来跟export关键字联合使用的语法
// 所以{}里面导出的东西也不是map的简写形式，就是要导出东西的标识符
export {
  personName,
  run,
}