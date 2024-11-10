// 很熟悉的模块化方式，这是CommonJS的模块化方式，这个文件也是一个模块
// 但因为webpack是运行在Node环境下的，所以最好用Node专门的模块化方式CommonJS来导出东西，而不要用ESModule导来出东西
// 下面都是固定写法
const { type } = require("os");
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
        // 这里是个正则表达式，代表以图片格式结尾
        // 告诉webpack但凡遇到以图片格式结尾都当做资源来处理
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        // 类型设置为资源
        type: "asset",
        generator: {
          // 设置打包后图片的名称
          // 默认情况下，webpack会为每张图片生成一个hash值来避免图片命名重复，所以打包后图片的名字就是[hash][ext]
          // 但是如果我们希望打包后还能知道我们原来对图片的命名，则可以自定义打包后图片的名称
          // [name]是我们对图片的命名
          // [ext]是图片的扩展名
          // [hash]是webpack为每张图片生成的hash值
          // 当然我们也可以在filename最前面加上一个“img/”，这样webpack在打包图片时，就会先在build目录下创建一个img目录，然后把图片都打包到这个目录里，而不是全都乱哄哄放在build目录下了
          filename: "img/[hash]_[name][ext]",
        },
      },
    ],
  },
};