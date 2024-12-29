<template>
  <div class="favor-page tab-bar-direct-page">
    <div v-for="index in 100">
      收藏：{{ index }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "favor-page"
});
</script>

<style lang="less" scoped></style>