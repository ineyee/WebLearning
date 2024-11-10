<!-- HTML -->
<template>
  <div class="title">{{ title }}</div>
  <div class="content">{{ content }}</div>
</template>

<!-- CSS -->
<style>
  .title {
    font-size: 24px;
    font-weight: bold;
    color: red;
  }

  .content {
    font-size: 16px;
    color: blue;

    user-select: none;
  }
</style>

<!-- JS -->
<script>
  export default {
    data() {
      return {
        title: "我是标题",
        content: "我是内容",
      }
    },
  }
</script>