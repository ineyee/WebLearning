const personName = "李四";
const _personAge = 19;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 使用exports导出
// 还记得Node里的全局对象exports吗？每个模块里都有一个自己的exports全局对象！
// CommonJS里的导出其实就是在给exports全局对象添加key-value
exports.personName = personName;
exports.run = run;

/// 多想一步，CommonJS底层应该管理着一个更大的map，在做类似下面的事，以便将来require函数能根据路径找到对应路径下的exports（去主模块main.js里打印它的module，里面就存储类似这样的映射信息）
// {
//   "./file1.js": exports1,
//   "./file2.js": exports2,
// }