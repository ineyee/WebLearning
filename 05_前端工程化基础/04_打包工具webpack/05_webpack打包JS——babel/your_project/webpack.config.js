// 很熟悉的模块化方式，这是CommonJS的模块化方式，这个文件也是一个模块
// 但因为webpack是运行在Node环境下的，所以最好用Node专门的模块化方式CommonJS来导出东西，而不要用ESModule导来出东西
// 下面都是固定写法
const pathModule = require("path");
module.exports = {
  // 入口文件
  entry: "./src/main.js",
  output: {
    // 出口目录
    // 但是需要注意配置文件里的这个字段不能接收一个相对路径（类似“./src/build”这样是不行的）
    // 必须接收一个绝对路径（类似”/Users/ineyee/Desktop/WebLearning/05_前端工程化基础/04_打包工具webpack/03_webpack的基本使用/02_webpack修改入口文件和出口目录、文件/your_project/build“这样才行）
    path: pathModule.resolve(__dirname, "./build"),
    // 出口文件
    filename: "your_project_1.0.0_release.js",
  },
  module: {
    // 配置loader
    rules: [
      {
        // 这里是个正则表达式，代表以“.js”结尾
        // 告诉webpack但凡遇到以“.js”结尾的文件都用下面的loader来处理
        test: /\.js$/,
        // 具体的loader，注意use中loader的使用顺序是从后往前的
        use: [
          // 告诉webpack用babel-loader来处理.js文件，webpack会自动去babel.config.js文件里读取babel-loader的配置
          { loader: "babel-loader" },
        ],
      },
    ],
  },
};