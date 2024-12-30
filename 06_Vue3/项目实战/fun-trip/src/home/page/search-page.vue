<template>
  <div class="search-page">
    <van-nav-bar title="搜索" safe-area-inset-top left-arrow @click-left="_onClickLeft" />
    <div>搜索入参</div>
    <div>* 城市：{{ _cityStore.selectedCity.cityName }}</div>
    <div>* 入住时间：{{ _homeStore.beginDateString }}</div>
    <div>* 离店时间：{{ _homeStore.endDateString }}</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '../store/city-store';
import useHomeStore from '../store/home-store';

defineOptions({
  name: "search-page"
});

const _router = useRouter();

const _homeStore = useHomeStore();
const _cityStore = useCityStore();

const _onClickLeft = () => {
  _router.back();
};
</script>

<style lang="less" scoped></style>