<template>
  <div>
    <Counter1></Counter1>
    <Counter2></Counter2>
  </div>
</template>

<script setup>
import Counter1 from './component/Counter1.vue';
import Counter2 from './component/Counter2.vue';

defineOptions({
  name: "App",
});
</script>

<style lang="less" scoped></style>