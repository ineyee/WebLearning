const personName = "张三";
const _personAge = 18;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 使用exports导出（实际开发中一般不用这种方式导出）
// 还记得Node里的全局对象exports吗？每个模块里都有一个自己的exports全局对象！
// CommonJS里使用exports导出其实就是在给exports对象添加key-value
//
// 注意：使用exports导出时只能这样一个属性一个属性赋值，千万不要exports = { ... }这样导出
exports.personName = personName;
exports.run = run;

// 但其实Node在实现CommonJS时，设计exports对象指向了module.exports对象
// 因此这两种导出方式的本质是一样的
console.log("file1", exports === module.exports); // true
