const fs = require("fs");
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("@vant/auto-import-resolver");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");

// 读取 package.json 文件里的 字段
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const name = packageJson.name;
const version = packageJson.version;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      //当 unplugin-vue-components 版本大于等于 0.26.0 时，使用以下写法
      AutoImport.default({
        resolvers: [VantResolver()],
      }),
      Components.default({ resolvers: [VantResolver()] }),
    ],
  },
  outputDir: path.resolve(__dirname, "./build", `${name}_${version}`),
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/fun-trip/" // 必须与 nginx 里的 location 路径匹配
      : "/",
});
