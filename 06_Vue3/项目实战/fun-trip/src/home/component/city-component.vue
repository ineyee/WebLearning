<template>
  <div class="city-component">
    <div class="city">杭州</div>
    <div class="position">
      <div class="my-position">我的位置</div>
      <img class="position-icon" src="../../asset/image/icon_location.png" alt="">
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "city-component"
});
</script>

<style lang="less" scoped>
.city-component {
  padding: 10px 20px 10px 20px;

  display: flex;
  justify-content: space-between;

  .position {
    display: flex;
    align-items: center;

    .position-icon {
      width: 18px;
      height: 18px;
      padding-left: 10px;
    }
  }
}
</style>