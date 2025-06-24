<template>
  <button @click="handleClick">获取动态列表</button>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleClick() {
      // fetch("http://127.0.0.1:8000/moment/getMomentList?pageSize=10&pageIndex=0 ").then((res) => {
      //   return res.json();
      // }).then((data) => {
      //   console.log("动态列表", data);
      // });

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
