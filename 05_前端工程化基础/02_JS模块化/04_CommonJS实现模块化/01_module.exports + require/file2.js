const personName = "李四";
const _personAge = 19;

function run() {
  console.log(`${personName} run`);
}

function _sleep() {
  console.log(`${_personAge} sleep`);
}

// 使用module.exports导出（实际开发中都是用这种方式导出）
// 还记得Node里的全局对象module吗？每个模块里都有一个自己的module全局对象！
// CommonJS里使用module.exports导出其实就是在给module对象的exports属性添加key-value
//
// 当map的key和value同名时，可以简写
module.exports = {
  personName,
  run,
};

console.log("file2 module = ", module);
/*
  module = {
    id: '/Users/ineyee/Desktop/WebLearning/05_前端工程化基础/02_JS模块化/04_CommonJS实现模块化/01_CommonJS的使用/02_module.exports + require/file2.js',
    exports: { personName: '李四', run: [Function: run] },
    loaded: false,
    children: [],
  }
*/