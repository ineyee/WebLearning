<template>
  <div>
    <div class="navi">
      <!-- 4、使用RouterLink元素切换路由，它有一个to属性，填写我们要跳转到的路由即可 -->
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/solutions">Solutions</RouterLink>
      <RouterLink to="/downloads">Downloads</RouterLink>
      <RouterLink to="/partners">Partners</RouterLink>
      <RouterLink to="/resource">Resource</RouterLink>
      <RouterLink to="/company" replace>Company</RouterLink>
    </div>
    <!-- 3、使用RouterView元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在RouterView元素的位置 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup>
defineOptions({
  name: "App",
});

const onClick = (type) => {
  console.log(type);
};
</script>

<style lang="less" scoped>
.navi {
  display: flex;
  justify-content: space-between;
}

.navi_item {
  cursor: pointer;
}
</style>

<!--
  vue-router的使用步骤：
  1、配置路由并导出
  2、在App启动的地方导入路由并注册
  3、使用RouterView元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在RouterView元素的位置
  4、使用RouterLink元素切换路由，它有一个to属性，填写我们要跳转到的路由即可；它还有一个replace属性是个bool值，设置replace之后，在切换路由时就不是类似“push”的操作，而是类似“pushOff”的操作，用户就无法通过浏览器自带的前进后退来切换到相应的页面了
    我们也可以通过手动改变地址栏里的路径来切换路由，组件也会被替换掉，RouterLink元素切换路由的本质就是在改变地址栏里的路径
-->