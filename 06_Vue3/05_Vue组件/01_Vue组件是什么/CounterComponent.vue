<!-- 比如这就是个有状态Component -->

<!-- UI（即视图）的结构 -->
<template>
  <div class="counter">当前计数: {{ counter }}</div>
  <button @click="add">➕</button>
</template>

<script>
export default {
  // 组件的名称
  name: "CounterComponent",

  // 组件的状态（即数据）
  data() {
    return {
      counter: 0,
    };
  },

  // 组件的交互（即事件）
  methods: {
    add() {
      this.counter++;
    },
  },
}
</script>

<!-- UI（即视图）的样式 -->
<style scoped>
.counter {
  font-size: 20px;
  font-weight: 500,
}
</style>