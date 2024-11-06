// 在webpack中获取路径或取别名必须使用绝对路径

/*
  内置模块path，有一个resolve函数可以用来拼接生成绝对路径，而且会自动处理macOS（/）和Windows（\）的盘符不一致的问题
  resolve函数会把传入的路径片段从右往左依次拼接来生成一个绝对路径
*/
const pathModule = require("path");
const absolutePath = pathModule.resolve("abc", "cba", "nba.txt");
console.log(absolutePath); // /Users/yiyi/Desktop/WebLearning/05_前端工程化基础/04_打包工具webpack/abc/cba/nba.txt