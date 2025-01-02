<template>
  <div class="home-page tab-bar-direct-page" ref="_scrollElementRef">
    <nav-bar></nav-bar>
    <banner-component></banner-component>
    <city-component></city-component>
    <date-component :onConfirm="_dateOnConfirm"></date-component>
    <hot-suggest-component></hot-suggest-component>
    <search-button-component></search-button-component>
    <category-component></category-component>
    <house-list-component></house-list-component>
  </div>
</template>

<script setup>
import NavBar from '../component/nav-bar.vue';
import BannerComponent from '../component/banner-component.vue';
import CityComponent from '../component/city-component.vue';
import DateComponent from '../component/date-component.vue';
import HotSuggestComponent from '../component/hot-suggest-component.vue';
import SearchButtonComponent from '../component/search-button-component.vue';
import CategoryComponent from '../component/category-component.vue';
import HouseListComponent from '../component/house-list-component.vue';
import useHomeStore from '../store/home-store';
import { useElementScrollToBottom } from '@/hook/use-scroll';

defineOptions({
  name: "home-page"
});

const _homeStore = useHomeStore();
_homeStore.getHotSuggests();
_homeStore.getCategories();
_homeStore.getHouseList();

const _dateOnConfirm = (beginDateString, endDateString) => {
  _homeStore.beginDateString = beginDateString;
  _homeStore.endDateString = endDateString;
};

const _scrollElementRef = useElementScrollToBottom(() => {
  _homeStore.page++;
  _homeStore.getHouseList();
});
</script>

<style lang="less" scoped></style>