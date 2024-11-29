<template>
  <button @click="onClick(0, '摘要')">摘要</button>
  <button @click="onClick(1, '转写')">转写</button>
  <button @click="onClick(2, '评论')">评论</button>
</template>

<script>
import eventBus from '../event_bus/event_bus.js';

export default {
  name: "Tab",
  methods: {
    onClick(index, type) {
      // 发出一个自定义事件
      // 第一个参数是自定义事件的名称
      // 第二个参数、第三个参数...是自定义事件的参数
      eventBus.emit("tap", {
        index: index,
        type: type,
      });
    },
  },
}
</script>

<style></style>