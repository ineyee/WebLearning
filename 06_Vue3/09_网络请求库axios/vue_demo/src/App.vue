<template>
  <div>
    <button @click="get">get请求</button>
    <button @click="post">post请求</button>
  </div>
</template>

<script setup>
import httpRequest from './HttpRequest';

defineOptions({
  name: "App",
});

const get = async () => {
  const response = await httpRequest.get({
    url: "http://123.207.32.32:8000/home/multidata",
  });
};

const post = async () => {
  const response = await httpRequest.postJson({
    url: "http://123.207.32.32:1888/02_param/postjson",
    body: {
      "username": "张三",
      "password": "123456",
    },
  });
};
</script>

<style lang="less" scoped></style>