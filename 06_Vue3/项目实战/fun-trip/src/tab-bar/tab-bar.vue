<template>
  <div class="tab-bar">
    <!--
      我们可以直接在template模板里使用vant里的组件，连导入都不用写，插件会自动解析template模板并帮我们自动导入所用到的组件
    -->
    <van-tabbar v-model="selectedIndex" v-show="curShowRoute.meta.showTabBar" active-color="#FF9854FF"
      inactive-color="#999999FF" :safe-area-inset-bottom="true" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/favor">收藏</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 注意这里是useRoute不是useRouter，useRoute hook函数用来获取当前正显示在屏幕上的路由界面
import { useRoute } from "vue-router";

defineOptions({
  name: "tab-bar"
});

const selectedIndex = ref(0);
const curShowRoute = useRoute();
</script>

<style lang="less" scoped></style>