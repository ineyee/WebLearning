## 代理服务器转发是什么

既然跨域发生在静态资源服务器上的 js 访问 API 服务器时，那我们完全可以引入一个第三者——一台代理服务器——来解决跨域，让静态资源服务器上的 js 去访问这台代理服务器，然后代理服务器再去访问 API 服务器，前面说过`跨域只发生在使用浏览器时，因为只有浏览器有同源策略`，所以代理服务器去访问 API 服务器时绝对没有跨域问题的，不过你可能会问了“那静态资源服务器上的 js 去访问代理服务器难道不会跨域吗？”答案是会，所以`我们还需要解决一下静态资源服务器上的 js 去访问代理服务器的跨域问题`，`开发阶段`具体怎么解决看下边

## node 代理服务器转发怎么实现

开发过程中，我们一般都是通过“npm run serve”来打开 vue 项目的，当我们通过“npm run serve”来打开 vue 项目时，VueCLI 会使用 webpack-dev-server 在本机启动一个本地服务器并监听 8080 端口，也就是说 vue 项目的源就是“http:127.0.0.1:8080”，我们可以认为 vue 项目是部署在“http:127.0.0.1:8080”这个源的

而 webpack 其实已经帮我们考虑好了`开发阶段`解决 vue 项目的跨域问题，`我们只需要在 vue.config.js 文件里做一下代理服务器的配置 + vue 项目里发起请求时通过 node 代理地址发起请求即可`，只要做了这个配置，当我们通过“npm run serve”来打开 vue 项目时，VueCLI 使用 webpack-dev-server 在本机启动的这个本地 node 服务器就不仅仅是一个静态资源服务器了，它与此同时还是一个代理服务器，这也是为什么这样做就可以解决上面提到的`静态资源服务器上的 js 去访问代理服务器的跨域问题`，因为它俩现在完全就是一台服务器且监听着相同的端口，类似于我们之前提到的方案一：把静态资源和 API 部署在同一个源下

- 首先在 vue.config.js 中配置代理服务器

```js
// ====== vue.config.js，可以去替换试试 ======

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
```

- 然后在发起请求的地方直接用 /api 开头的路径就可以了，同时也不要再加协议和 ip 地址

```js
// ====== App.vue，可以去替换试试 ======

<template>
  <button @click="handleClick">获取动态列表</button>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleClick() {
      // 开发阶段用 node 代理服务器，接口请求用 node 代理地址
      // 发布阶段用 nginx 代理服务器，接口请求用 nginx 代理地址
      const baseURL = process.env.NODE_ENV === 'production'
        ? '/client-demo/api'
        : '/api';
      fetch(`${baseURL}/moment/getMomentList?pageSize=10&pageIndex=0`).then((res) => {
        return res.json();
      }).then((data) => {
        console.log("动态列表", data);
      });
    }
  }
}
</script>
```
