// 1、浏览器中的全局对象是window，Node中与之对应的全局对象是global（window对象和global对象里挂了很多其它东西）
// 当然window对象和global对象有一个统一的别名是globalThis，也就是说运行时环境是浏览器时globalThis就指向window对象，运行时环境是Node时globalThis就指向global对象
console.log("global = ", global);
console.log("global === globalThis: ", global === globalThis); // global === globalThis:  true

// 2、获取当前文件夹名和文件名的全局对象
console.log(__dirname); // /Users/yiyi/Desktop/WebLearning/05_前端工程化基础/01_Node.js基础/01_基础知识
console.log(__filename); // /Users/yiyi/Desktop/WebLearning/05_前端工程化基础/01_Node.js基础/01_基础知识/04_Node中常见的全局对象.js

// 3、模块化相关的全局对象，后面模块化时具体学习
console.log("module = ", module);
console.log("exports = ", exports);
console.log("require() = ", require);