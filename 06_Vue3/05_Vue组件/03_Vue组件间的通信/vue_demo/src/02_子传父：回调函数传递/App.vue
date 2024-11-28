<template>
  <Tab :onTap="onTap"></Tab>
</template>

<script>
import Tab from './Tab.vue';

export default {
  name: "App",
  components: {
    Tab,
  },

  methods: {
    onTap(type) {
      console.log(`点击了：${type}`);
    },
  },
}
</script>

<style></style>