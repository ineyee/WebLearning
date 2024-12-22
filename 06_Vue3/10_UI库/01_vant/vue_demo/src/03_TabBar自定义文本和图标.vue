<!--
  一、自定义文本
  如果只需要自定义文本，那很简单，只需要修改van-tabbar-item标签的内容就可以了
-->

<!--
  二、自定义图标
  我们看到van-tabbar-item给我们提供了一个icon属性，这个属性指的就是图标，它接收一个字符串，但是这些字符串仅仅支持vant这个UI库里给我们内置好的那些图标，如果我们的UI设计有自己的图标，那就不能用icon属性了，就得自定义图标

  怎么自定义图标呢？其实也很简单，就是传递一个子组件进去，这个子组件的类型是什么都可以（就像Flutter里的Widget icon，父指针指向子类对象这种），既然要传递子组件就得用到插槽了，从官网可以看出图标插槽的名字叫做icon，所以我就给这个插槽传递值

  当然因为我们用了插槽，会把本来文本内容的位置给占没，因此如果要自定义图标，那肯定也得传递一个文本进去，而van-tabbar-item内部的文本插槽是个默认插槽，所以我们传递文本组件用不用template包裹都行
-->
<template>
  <div class="tab_bar">
    <van-tabbar v-model="selectedIndex" @change="selectedIndexDidChange">
      <!-- 如果只需要自定义文本，直接替换item的内容就可以了 -->
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <!--
        假设我们要自定义好友这个图标
        
        那外界在使用有插槽元素的组件时，怎么给组件传递子组件进去呢？
        1、直接给组件里嵌套子组件就是在给组件传递子组件
        2、不过Vue要求我们必须在子组件外面包一层template元素，并通过“v-slot:插槽元素名”这个语法来指定子组件具体要替换掉哪个插槽
          #是“v-slot:”的语法糖，就像@是“v-on:”的语法糖、:是“v-bind:”的语法糖那样
      -->
      <van-tabbar-item>
        <!-- icon插槽 -->
        <template #icon>
          <!-- 这里的src因为要写表达式而不是写死某个url，所以用到了动态绑定 -->
          <img
            :src="selectedIndex === 2 ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png' : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'">
        </template>
        <!-- 默认插槽 -->
        <div>好友</div>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: "TabBar"
});

const selectedIndex = ref(0);
const selectedIndexDidChange = (newSelectedIndex) => {
  console.log(`点击了标签 ${newSelectedIndex}`);
};
</script>

<style lang="less" scoped></style>