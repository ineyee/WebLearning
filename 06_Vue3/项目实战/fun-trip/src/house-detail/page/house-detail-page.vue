<template>
  <van-nav-bar title="房屋详情" safe-area-inset-top left-arrow @click-left="_onClickLeft" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useHouseDetailStore from '../store/house-detail-store';

defineOptions({
  name: "house-detail-page"
});

const _router = useRouter();
const _route = useRoute();
const _houseDetailStore = useHouseDetailStore();

const _onClickLeft = () => {
  _router.back();
};

/*
  在JS代码里如何获取动态路由里的参数呢？
  * 首先导入vue-router给我们提供的“useRoute()”hook函数
  * useRoute()函数的返回值route：就是当前路由对象
  * route.params：就是动态路由里的所有参数
  * route.params.属性名：就能拿到动态路由里属性对应的参数值了
*/
_houseDetailStore.getHouseDetail(_route.params.houseId);
</script>

<style lang="less" scoped></style>