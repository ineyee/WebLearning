<template>
  <div class="home-page tab-bar-direct-page">
    <nav-bar></nav-bar>
    <banner-component></banner-component>
    <city-component></city-component>
    <date-component :onConfirm="_dateOnConfirm"></date-component>
    <hot-suggest-component></hot-suggest-component>
    <search-button-component></search-button-component>
  </div>
</template>

<script setup>
import NavBar from '../../component/nav-bar.vue';
import BannerComponent from '../component/banner-component.vue';
import CityComponent from '../component/city-component.vue';
import DateComponent from '../component/date-component.vue';
import HotSuggestComponent from '../component/hot-suggest-component.vue';
import SearchButtonComponent from '../component/search-button-component.vue';
import useHomeStore from '../store/home-store';

defineOptions({
  name: "home-page"
});

const _homeStore = useHomeStore();
_homeStore.getHotSuggests();

const _dateOnConfirm = (beginDateString, endDateString) => {
  _homeStore.beginDateString = beginDateString;
  _homeStore.endDateString = endDateString;
};
</script>

<style lang="less" scoped></style>