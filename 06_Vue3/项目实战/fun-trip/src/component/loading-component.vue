<template>
  <div class="loading-component">
    <div class="background">
      <img class="image" src="../asset/image/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "loading-component"
});
</script>

<style lang="less" scoped>
.loading-component {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 99;

  .background {
    width: 104px;
    height: 104px;

    background-image: url(../asset/image/loading-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;

    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      width: 70px;
      height: 70px;
    }
  }
}
</style>