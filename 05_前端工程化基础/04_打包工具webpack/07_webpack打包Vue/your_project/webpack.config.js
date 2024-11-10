// 很熟悉的模块化方式，这是CommonJS的模块化方式，这个文件也是一个模块
// 但因为webpack是运行在Node环境下的，所以最好用Node专门的模块化方式CommonJS来导出东西，而不要用ESModule导来出东西
// 下面都是固定写法
const pathModule = require("path");
// vue-loader需额外配置一个插件
const { VueLoaderPlugin } = require("vue-loader/dist/index");
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
        // 除了这里的loader，vue-loader需额外配置一个插件
        // 这里是个正则表达式，代表以“.vue”结尾
        // 告诉webpack但凡遇到以“.vue”结尾的文件都用下面的loader来处理
        test: /\.vue$/,
        // 具体的loader，注意use中loader的使用顺序是从后往前的
        use: [
          // 告诉webpack用vue-loader来处理.vue文件
          { loader: "vue-loader" },
        ],
      },
      {
        // 这里是个正则表达式，代表以“.css”结尾
        // 告诉webpack但凡遇到以“.css”结尾的文件都用下面的loader来处理
        test: /\.css$/,
        // 具体的loader，注意use中loader的使用顺序是从后往前的
        use: [
          // 告诉webpack用style-loader来把加载到的CSS样式插入到HTML页面里
          { loader: "style-loader" },
          // 告诉webpack用css-loader来加载.css文件
          { loader: "css-loader" },
          // 告诉webpack用postcss-loader来自动给某些css属性加浏览器前缀（当然也可以做很多其它的事情，先加完前缀，然后再交给css-loader处理。webpack会自动去postcss.config.js文件里读取postcss-loader的配置）
          { loader: "postcss-loader" },
        ],
      },
      {
        // 这里是个正则表达式，代表以“.less”结尾
        // 告诉webpack但凡遇到以“.less”结尾的文件都用下面的loader来处理
        test: /\.less$/,
        // 具体的loader，注意use中loader的使用顺序是从后往前的
        use: [
          // 告诉webpack用style-loader来把加载到的CSS样式插入到HTML页面里
          { loader: "style-loader" },
          // 告诉webpack用css-loader来加载.css文件（less-loader处理完.less文件后其实是生成了对应的css，所以还得用css-loader来做进一步地处理）
          { loader: "css-loader" },
          // 告诉webpack用less-loader来加载.less文件
          { loader: "less-loader" },
          // 告诉webpack用postcss-loader来自动给某些css属性加浏览器前缀（当然也可以做很多其它的事情，先加完前缀，然后再交给less-loader处理。webpack会自动去postcss.config.js文件里读取postcss-loader的配置）
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
  plugins: [
    // vue-loader需额外配置一个插件
    new VueLoaderPlugin(),
  ],
};