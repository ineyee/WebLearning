<template>
  <div class="house-image-component">
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <template v-for="pic in curHouseImages" :key="pic.orderIndex">
        <van-swipe-item class="swipe-item">
          <img class="image" :src="pic.url" alt="">
        </van-swipe-item>
      </template>
      <!-- 这里的参数是作用域插槽，组件内部暴露出来给我们用的数据 -->
      <template #indicator="{ active, total }">
        <div class="indicator">{{ isNaN(active) ? 0 : active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
defineOptions({
  name: "house-image-component"
});

defineProps({
  curHouseImages: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped>
.house-image-component {
  height: 240px;

  .swipe {
    .swipe-item {
      .image {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 5px 8px;

      border-radius: 11px;

      background: rgba(0, 0, 0, 0.5);

      font-size: 10px;
      color: #fff;
      text-align: center;
      line-height: 12px;
    }
  }
}
</style>