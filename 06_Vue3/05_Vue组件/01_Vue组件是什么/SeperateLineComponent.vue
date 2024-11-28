<!-- 比如这就是个无状态Component -->

<!-- UI（即视图）的结构 -->
<template>
  <div class="line"></div>
</template>

<script>
export default {
  // 组件的名称
  name: "SeperateLineComponent",
}
</script>

<!-- UI（即视图）的样式 -->
<style scoped>
.line {
  height: 1px;
  background-color: black;
}
</style>