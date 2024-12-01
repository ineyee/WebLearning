<!--
  一、假设我们要用OptionsApi编写一个组件，这个组件有两大功能：
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
export default {
  name: "OptionsApi",
  data() {
    return {
      // 计数器功能的逻辑
      counter: 0,

      // 获取窗口当前尺寸功能的逻辑
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  },
  methods: {
    // 计数器功能的逻辑
    add() {
      this.counter++;
    },

    // 获取窗口当前尺寸功能的逻辑
    get() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
  },
}
</script>

<style scoped></style>

<!--
  二、OptionsApi的弊端
  1、逻辑分散：在OptionsApi中，组件某个功能的逻辑必须分散在不同的选项里（如data、methods等），且多个功能的逻辑也必须混在指定的选项里，这就导致某个功能的代码不集中，当组件的复杂度和代码量上来时，我们需要在文件里划来划去才能理清某个功能的代码是如何实现的，很难维护
  2、逻辑复用困难：在OptionsApi中，我们很难把某个功能的逻辑给抽取出来以便其它组件复用
-->