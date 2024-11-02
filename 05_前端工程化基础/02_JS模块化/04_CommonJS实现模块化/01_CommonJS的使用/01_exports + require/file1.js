const personName = "张三";
const _personAge = 18;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 使用exports导出
// 还记得Node里的全局对象exports吗？CommonJS里的导出其实就是在给那个全局对象增加key-value，我们可以理解为文件的唯一路径是key，导出内容所构成的map是value：
// exports = {
//   "./file1.js": {
//     personName: "张三",
//     run: run,
//   },
// };
exports.personName = personName;
exports.run = run;