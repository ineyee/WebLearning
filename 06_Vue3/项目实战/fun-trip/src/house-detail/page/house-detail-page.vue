<template>
  <div class="house-detail-page">
    <van-nav-bar class="nav-bar" title="房屋详情" safe-area-inset-top left-arrow @click-left="_onClickLeft" />
    <HouseImageComponent :cur-house-images="_houseDetailStore.housePics"></HouseImageComponent>
    <HouseInfoComponent :cur-house-info="_houseDetailStore.topModule"></HouseInfoComponent>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import HouseInfoComponent from '../component/house-info-component.vue';
import HouseImageComponent from '../component/house-image-component.vue';
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