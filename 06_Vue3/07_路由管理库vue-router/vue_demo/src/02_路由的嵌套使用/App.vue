<template>
  <div>
    <div class="navi">
      <!-- 4、使用RouterLink元素切换路由，它有一个to属性，填写我们要跳转到的路由即可 -->
      <div class="navi_item" @click="onClick(0)">Products</div>
      <div class="navi_item" @click="onClick(1)">Solutions</div>
      <div class="navi_item" @click="onClick(2)">Downloads</div>
      <div class="navi_item" @click="onClick(3)">Partners</div>
      <div class="navi_item" @click="onClick(4)">Resource</div>
      <div class="navi_item" @click="onClick(5)">Company</div>
    </div>
    <!-- 3、使用RouterView元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在RouterView元素的位置 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineOptions({
  name: "App",
});

const router = useRouter();
const onClick = (type) => {
  switch (type) {
    case 0:
      router.push("/products");
      break;
    case 1:
      router.push("/solutions");
      break;
    case 2:
      router.push("/downloads");
      break;
    case 3:
      router.push("/partners");
      break;
    case 4:
      router.push("/resource");
      break;
    case 5:
      router.push("/company");
      break;
    default:
      break;
  }
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
  4、使用vue-router提供的router对象来切换路由
    * 导入”useRouter()“hook函数
    * router.push(...)：打开一个新路由，并将其加入到浏览器历史记录中
    * router.back()：返回到浏览器历史记录中的上一页（等价于浏览器的返回按钮）
    * router.forward()：前进到浏览器历史记录中的下一页（等价于浏览器的前进按钮）
    * router.replace()：切换路由时就不是类似“push”的操作，而是类似“pushOff”的操作，用户就无法通过浏览器自带的前进后退来切换到相应的页面了
  我们也可以通过手动改变地址栏里的路径来切换路由，组件也会被替换掉，RouterLink元素切换路由的本质就是在改变地址栏里的路径
-->