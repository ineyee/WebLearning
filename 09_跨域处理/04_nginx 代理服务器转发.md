## 代理服务器转发是什么

既然跨域发生在静态资源服务器上的 js 访问 API 服务器时，那我们完全可以引入一个第三者——一台代理服务器——来解决跨域，让静态资源服务器上的 js 去访问这台代理服务器，然后代理服务器再去访问 API 服务器，前面说过`跨域只发生在使用浏览器时，因为只有浏览器有同源策略`，所以代理服务器去访问 API 服务器时绝对没有跨域问题的，不过你可能会问了“那静态资源服务器上的 js 去访问代理服务器难道不会跨域吗？”答案是会，所以`我们还需要解决一下静态资源服务器上的 js 去访问代理服务器的跨域问题`，`发布阶段`具体怎么解决看下边

## nginx 代理服务器转发怎么实现

`我们只需要在 nginx.conf 文件里做一下代理服务器的配置 + vue 项目里发起请求时通过 nginx 代理地址发起请求即可`。这样做就可以解决上面提到的`静态资源服务器上的 js 去访问代理服务器的跨域问题`，因为 nginx 作为云服务器上的一个软件，它现在充当了两个角色：监听 80 端口返回 vue 项目的静态资源、所以我们可以把它视作就是静态资源服务器；监听 80 端口转发请求，所以我们可以把它视作就是代理服务器，也就是说静态资源服务器和代理服务器现在完全就是一台服务器且监听着相同的端口，类似于我们之前提到的方案一：把静态资源和 API 部署在同一个源下

- 首先在 vue.config.js 中配置代理服务器

```js
// ====== nginx.conf，可以去替换试试 ======

location /client-demo {
    alias /root/client-demo/;
    index index.html;
    try_files $uri $uri/ /fun-car/index.html;
}

# 专门处理API请求，api 后面的 / 不能少
location /client-demo/api/ {
    # nginx 服务器在监听 80 端口所有 vue 项目的访问，可以充当代理服务器的功能
    # 当收到匹配 /client-demo/api 的请求时，都转发到 api 服务器
    # 后面的 / 不能少
    proxy_pass http://118.25.70.197:8000/;
}
```

- 然后在发起请求的地方直接用 /client-demo/api 开头的路径就可以了，同时也不要再加协议和 ip 地址

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
