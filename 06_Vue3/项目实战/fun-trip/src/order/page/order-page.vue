<template>
  <div class="order-page tab-bar-direct-page" ref="_scrollElementRef">
    <div v-for="index in 100">
      订单：{{ index }}
    </div>
  </div>
</template>

<script setup>
import { useElementScroll } from '@/hook/use-scroll';
import { onActivated } from 'vue';

defineOptions({
  name: "order-page"
});

const _scrollElementRef = useElementScroll({
  scrollingCallback: ({ contentScrolledHeight }) => {
    _contentScrolledHeight = contentScrolledHeight;
  },
});

// 我们需要自己记录界面的滚动位置，当界面再次出现时让界面滚动到指定的位置
let _contentScrolledHeight = 0;
onActivated(() => {
  console.log(_contentScrolledHeight);
  _scrollElementRef.value?.scrollTo({
    top: _contentScrolledHeight,
  });
});
</script>

<style lang="less" scoped></style>