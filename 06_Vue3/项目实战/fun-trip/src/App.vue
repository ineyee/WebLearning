<template>
  <div class="app">
    <!-- 使用router-view元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在router-view元素的位置 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
defineOptions({
  name: "app"
});
</script>

<style lang="less" scoped></style>