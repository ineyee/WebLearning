// 这也是一个子模块

export const personName = "李四";
const _personAge = 19;

export function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}