const _personName = "张三";
const _personAge = 18;

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 导出方式三：export default默认导出法（也比较常用，只能使用导入方式三默认导入法导入）
// 
// 默认导出法一般应用在一个模块里只有一个非常重要的东西需要对外暴露、而不导出其它东西的场景
// 默认导出时不需要给导出的东西起名字，直接导出即可
// 注意：一个模块里只能有一个默认导出
export default function() {
  console.log(`${personName} run`);
}