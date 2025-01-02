<template>
  <div class="houst-list-item-t3-component">
    <van-image class="house-image" :src="data.image.url" fit="cover" width="100%" />
    <div class="house-info">
      <div class="location">
        <img src="../../asset/image/location.png" alt="">
        <div>
          {{ data.location }}
        </div>
      </div>
      <van-text-ellipsis class="house-name" :content="data.houseName" :rows="2" />
      <div class="summary-text">
        {{ data.summaryText }}
      </div>
      <div class="product-price">￥{{ data.finalPrice }}</div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "houst-list-item-t3-component"
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
.houst-list-item-t3-component {
  position: relative;

  height: 223px;
  border-radius: 6px;

  background-color: #fff;

  .house-image {
    height: 50%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    :deep(img) {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }

  .house-info {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;

    padding: 10px;
    border-radius: 0px 0px 6px 6px;

    .location {
      display: flex;
      align-items: center;

      img {
        width: 12px;
        height: 12px;
      }

      div {
        margin-left: 2px;

        font-size: 11px;
        color: #666;
      }
    }

    .summary-text {
      font-size: 10px;
      color: #666;
    }

    .house-name {
      font-size: 14px;
      color: #333;
    }

    .product-price {
      font-size: 14x;
      color: var(--main-color);
    }
  }
}
</style>