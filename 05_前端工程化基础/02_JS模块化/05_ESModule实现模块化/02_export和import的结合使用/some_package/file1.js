// 这是一个子模块

const personName = "张三";
const _personAge = 18;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

export {
  personName,
  run,
}