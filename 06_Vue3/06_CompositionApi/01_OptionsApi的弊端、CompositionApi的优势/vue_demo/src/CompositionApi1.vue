<!--
  一、现在我们用CompositionApi编写同样一个组件，这个组件有两大功能：
  1、计数器功能，是这个组件的核心功能
  2、获取窗口当前尺寸功能，是这个组件的辅助功能、以便组件能根据窗口大小做适配
-->
<template>
  <div>
    <div>当前计数：{{ counter }}</div>
    <button @click="add">➕</button>

    <div>窗口当前尺寸：{{ windowWidth }} {{ windowHeight }}</div>
    <button @click="get">获取</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "CompositionApi1",
  setup() {
    // 计数器功能的逻辑
    // 抽取成函数前
    const counter = ref(0);
    const add = () => {
      counter.value++;
    };

    // 获取窗口当前尺寸功能的逻辑
    // 抽取成函数前
    const windowWidth = ref(window.innerWidth);
    const windowHeight = ref(window.innerHeight);
    const get = () => {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
    };

    return {
      counter,
      add,

      windowWidth,
      windowHeight,
      get,
    };
  },
}
</script>

<style scoped></style>

<!--
  二、CompositionApi的优势
  1、逻辑集中：在CompositionApi中，组件某个功能的逻辑可以高聚合在一起，且多个功能的逻辑也不必混在一起，代码更容易维护
  2、逻辑复用简单：在CompositionApi中，我们可以很简单地把某个功能的逻辑给抽取成一个函数，以便其它组件复用，这也是函数式编程的一个体现
-->