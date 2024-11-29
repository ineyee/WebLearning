<template>
  <div>{{ index }} - {{ type }}</div>
</template>

<script>
import eventBus from '../event_bus/event_bus';

export default {
  name: "TabView",
  data() {
    return {
      index: 0,
      type: "摘要",
    };
  },
  methods: {
    handleTapEvent(params) {
      this.index = params.index;
      this.type = params.type;
    },
  },
  // 生命周期函数我们后面会专门说，这里先不用关心
  created() {
    // 监听事件
    eventBus.on("tap", this.handleTapEvent);
  },
  unmounted() {
    // 移除监听事件，避免内存泄漏
    eventBus.off("tap", this.handleTapEvent);
  },
}
</script>

<style></style>