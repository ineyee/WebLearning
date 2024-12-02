<template>
  <div>
    <Watch></Watch>
    <DeepWatch></DeepWatch>
  </div>
</template>

<script>
import Watch from './01_观察属性变化时的新旧值.vue';
import DeepWatch from './02_深度观察.vue';

export default {
  name: "App",
  components: {
    Watch,
    DeepWatch,
  },
}
</script>

<style scoped></style>