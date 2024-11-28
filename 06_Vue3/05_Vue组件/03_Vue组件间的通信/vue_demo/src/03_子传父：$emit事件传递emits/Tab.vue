<template>
  <button @click="onClick('摘要')">摘要</button>
  <button @click="onClick('转写')">转写</button>
  <button @click="onClick('评论')">评论</button>
</template>

<script>
export default {
  name: "Tab",
  // 自定义事件
  // 
  // 自定义事件的概念相当于是给当前组件自带了某些可被监听的事件，类似于button自带的click事件一样
  // 这样一来外界就可以通过”v-on:自定义事件“来监听这些事件了，就像我们监听button的click事件一样
  emits: ["tap"],
  methods: {
    onClick(type) {
      // 发出一个自定义事件
      // 第一个参数是自定义事件的名称
      // 第二个参数、第三个参数...是自定义事件的参数
      this.$emit("tap", type);
    },
  },
}
</script>

<style></style>