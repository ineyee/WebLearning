<template>
  <!--
    在template中如何获取动态路由里的参数呢？
    * $route：就是当前路由对象
    * $route.params：就是动态路由里的所有参数
    * $route.params.属性名：就能拿到动态路由里属性对应的参数值了
  -->
  <div>
    User：{{ $route.params.id }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

defineOptions({
  name: "User"
});

/*
  在JS代码里如何获取动态路由里的参数呢？
  * 首先导入vue-router给我们提供的“useRoute()”hook函数
  * useRoute()函数的返回值route：就是当前路由对象
  * route.params：就是动态路由里的所有参数
  * route.params.属性名：就能拿到动态路由里属性对应的参数值了
*/
const route = useRoute();
console.log(route.params.id);
</script>

<style lang="less" scoped></style>