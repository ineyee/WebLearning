<template>
  <!--
    v-on监听子组件里的自定义事件
    这里就不用显式地传递参数了，默认就会把参数传给绑定的函数，所以直接在methods里定义函数的地方接收参数就行了，就像button.click默认就会传递event参数一样
  -->
  <Tab @tap="onTap"></Tab>
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