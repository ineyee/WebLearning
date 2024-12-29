<template>
  <div class="cityPage tab-bar-indirect-page">
    <div v-for="index in 100">
      城市：{{ index }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "cityPage"
});
</script>

<style lang="less" scoped></style>