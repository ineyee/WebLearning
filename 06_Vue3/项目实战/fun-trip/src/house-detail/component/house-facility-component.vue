<template>
  <div class="house-facility-component">
    <HouseSectionComponent header-text="房屋设施" footer-text="查看全部设施">
      <template #content>
        <div>
          <button>无限网络</button>
          <button>电梯</button>
          <button>落地窗</button>
          <button>空调-冷暖</button>
          <button>晾衣架</button>
          <button>热水器</button>
          <button>独立卫浴</button>
        </div>
      </template>
    </HouseSectionComponent>
  </div>
</template>

<script setup>
import HouseSectionComponent from './house-section-component.vue';

defineOptions({
  name: "house-facility-component"
});
</script>

<style lang="less" scoped></style>