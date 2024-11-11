const { mergeFunc } = require("webpack-merge");
const webpackConfigCommom = require("./webpack.config.com");

module.exports = mergeFunc(webpackConfigCommom, {
  mode: "development",
});