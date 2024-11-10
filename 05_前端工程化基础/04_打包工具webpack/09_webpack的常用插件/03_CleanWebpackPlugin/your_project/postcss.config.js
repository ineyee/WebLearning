// 很熟悉的模块化方式，这是CommonJS的模块化方式，这个文件也是一个模块
// 但因为webpack是运行在Node环境下的，所以最好用Node专门的模块化方式CommonJS来导出东西，而不要用ESModule导来出东西
// 下面都是固定写法
module.exports = {
  // postcss所依赖的插件
  plugins: [
    "postcss-preset-env",
  ],
};