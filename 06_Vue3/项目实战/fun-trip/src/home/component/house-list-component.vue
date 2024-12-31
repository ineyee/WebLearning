<template>
  <div class="house-list-component">
    <div class="title">
      热门精选
    </div>
    <div class="list"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: "house-list-component"
});
</script>

<style lang="less" scoped>
.house-list-component {
  padding: 10px 20px 10px 20px;

  .title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>