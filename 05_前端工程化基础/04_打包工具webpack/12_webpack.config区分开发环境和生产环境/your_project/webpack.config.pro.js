// clean-webpack-plugin模块是一个一个插件单独导出，所以接收时得用map的解构来接收
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { mergeFunc } = require("webpack-merge");
const webpackConfigCommom = require("./webpack.config.com");

module.exports = mergeFunc(webpackConfigCommom, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
  ],
});