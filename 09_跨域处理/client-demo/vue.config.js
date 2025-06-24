const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 静态资源服务器上的 js 发起以 /api 开头的请求时会请求到代理服务器
      "/api": {
        // 代理服务器要转发到的目标服务器地址——即 api 服务器的真实地址
        target: "http://118.25.70.197:8000",
        // 重写路径，去掉 /api 前缀
        // 静态资源服务器上的 js 发起的请求是以 /api 开头的，但 api 服务器上并没有这个前缀，所以需要重写路径，例如：/api/users 会被重写为 /users
        pathRewrite: {
          "^/api": "",
        },
        // 改变请求源
        // api 服务器可能配置了只接收来自静态服务器 ip 地址的请求，所以当它接收到来自代理服务器的请求时，可能会拒绝访问，所以我们要通过这个配置让 api 服务器认为代理服务器发出的请求就是静态服务器发出的请求
        changeOrigin: true,
      },
    },
  },
});
