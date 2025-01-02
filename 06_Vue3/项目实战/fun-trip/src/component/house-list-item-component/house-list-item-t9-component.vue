<template>
  <div class="houst-list-item-t9-component">
    <van-image :src="data.image?.url" radius="6px" fit="cover" height="100%" />
    <div class="house-info">
      <div class="summary-text">
        {{ data.summaryText }}
      </div>
      <van-text-ellipsis class="house-name" :content="data.houseName" :rows="2" />
      <div class="score-price">
        <!-- 组件给我们提供的是双向绑定，但是如果我们只想用它的显示而不想用它的交互，那就直接设置model-value即可 -->
        <van-rate :model-value="Number(data.commentScore)" :size="12" color="#fff" readonly allow-half />
        <div class="product-price">￥{{ data.finalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "houst-list-item-t9-component"
});

const _props = defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped>
.houst-list-item-t9-component {
  position: relative;

  height: 223px;
  border-radius: 6px;

  background-color: #f3f3f3;

  .house-info {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;

    padding: 10px;
    border-radius: 0px 0px 6px 6px;

    background-image: linear-gradient(179deg, rgba(0, 0, 0, 0) 16%, rgba(0, 0, 0, .64));

    .summary-text {
      font-size: 10px;
      color: #fff;
    }

    .house-name {
      font-size: 14px;
      color: #fff;
    }

    .score-price {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .product-price {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>