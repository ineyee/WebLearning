// 很熟悉的模块化方式，这是CommonJS的模块化方式，这个文件也是一个模块
// 但因为webpack是运行在Node环境下的，所以最好用Node专门的模块化方式CommonJS来导出东西，而不要用ESModule导来出东西
// 下面都是固定写法
const { extensions } = require("interpret");
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
  resolve: {
    // 配置import时可自动拼接的后缀名、以便在导入时就不用写后缀名了
    // 但是实践中建议仅对“.js、.jsx、ts、.tsx”等JavaScript和TypeScript文件使用省略后缀功能，对于CSS、图片、Vue等文件，推荐显式写出文件后缀，以避免潜在的问题
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};