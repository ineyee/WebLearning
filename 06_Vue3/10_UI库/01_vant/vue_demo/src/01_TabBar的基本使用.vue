<template>
  <div class="tab_bar">
    <!--
      我们可以直接在template模板里使用vant里的组件，连导入都不用写，插件会自动解析template模板并帮我们自动导入所用到的组件
    -->
    <van-tabbar v-model="active" :safe-area-inset-bottom="true">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
defineOptions({
  name: "TabBar"
});
</script>

<style lang="less" scoped></style>

<!--
  问题一：van-tabbar是怎么做到显示在屏幕底部的呢？
  问题二：van-tabbar是怎么做到看起来页面像是嵌入在它里面的呢？
  
  我们可以去浏览器里看下van-tabbar的样式，可以发现：
  * 它其实用的是固定定位，固定在了底部而已
  * 它的z-index是1，而元素在不设置z-index的情况下默认是0，所以它会盖住页面产生内嵌的效果
    * 不过需要注意的是页面的大小还是整个屏幕的大小，而不是到van-tabbar顶部为止，因此针对van-tabbar首屏的几个页面我们需要自己处理页面被van-tabbar遮挡的问题，处理的方式一般就是手动设置几个首屏页面的高度为：屏幕高度 - - van-tabbar的高度 - 底部安全区域的高度（抽取到common.css里了）
    * 而跳转进去的其它二级、三级页面里是不需要设置这个高度的，但是它们需要设置隐藏van-tabbar，隐藏van-tabbar的方式一般就是详见项目里，通过路由的meta属性来实现的
  
  .van-tabbar--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .van-tabbar {
    width: 100%;
    height: 50px;

    background: #fff;

    z-index: 1;
  }
-->