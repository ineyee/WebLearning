<template>
  <div class="nav-bar">
    <van-nav-bar title="趣旅行" />
  </div>
</template>

<script setup>
defineOptions({
  name: "nav-bar"
});
</script>

<style lang="less" scoped>
.nav-bar {
  :deep(.van-nav-bar__title) {
    font-size: var(--fs-20);
    font-weight: var(--fw-medium);
    color: var(--main-color);
  }
}
</style>