<template>
  <div class="tab_bar">
    <!--
      我们可以直接在template模板里使用vant里的组件，连导入都不用写，插件会自动解析template模板并帮我们自动导入所用到的组件
    -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
defineOptions({
  name: "TabBar"
});
</script>

<style lang="less" scoped></style>