<!--
  前面四篇我们讲的都是传递数据和传递事件，但实际开发中我们会遇到传递组件的场景
  也就是说我们封装的组件内部有些元素是由外界传进来的，而不是写死在组件内部的，就像Flutter Widget里的child和children那样
  Vue里要想实现这样的场景就得用插槽slot元素了
-->

<template>
  <!--
    那外界在使用有插槽元素的组件时，怎么给组件传递子组件进去呢？
    1、直接给组件里嵌套子组件就是在给组件传递子组件
    2、不过Vue要求我们必须在子组件外面包一层template元素，并通过“v-slot:插槽元素名”这个语法来指定子组件具体要替换掉哪个插槽
      #是“v-slot:”的语法糖，就像@是“v-on:”的语法糖、:是“v-bind:”的语法糖那样
  -->
  <AppBar>
    <template v-slot:title>
      <div class="home_title">首页</div>
    </template>
    <template #action>
      <button>🔍</button>
    </template>
    <!-- 这个组件会被传递给内部的默认插槽 -->
    <div>搜索</div>
    <!-- <template #default>
      <div>搜索</div>
    </template> -->
  </AppBar>
</template>

<script>
import AppBar from './AppBar.vue';

export default {
  name: "App",
  components: {
    AppBar,
  },
}
</script>

<style>
.home_title {
  font-size: 22px;
  font-weight: 500;

  color: black;
}
</style>