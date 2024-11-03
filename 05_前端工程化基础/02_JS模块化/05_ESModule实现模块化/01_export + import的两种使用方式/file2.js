// 导出方式二：export单独导出法（也比较常用）
// 我们还可以在定义变量和函数的时候就将它们导出，有时候这样导出写起来更简便

export const personName = "李四";
const _personAge = 19;

export function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}