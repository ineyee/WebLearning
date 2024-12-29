<template>
  <div class="message-page tab-bar-direct-page">
    <div v-for="index in 100">
      消息：{{ index }}
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "message-page"
});
</script>

<style lang="less" scoped></style>