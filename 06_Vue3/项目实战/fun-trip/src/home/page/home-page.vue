<template>
  <div class="home-page tab-bar-direct-page">
    <nav-bar></nav-bar>
    <banner-component></banner-component>
    <city-component></city-component>
  </div>
</template>

<script setup>
import NavBar from '../../component/nav-bar.vue';
import BannerComponent from '../component/banner-component.vue';
import CityComponent from '../component/city-component.vue';

defineOptions({
  name: "home-page"
});
</script>

<style lang="less" scoped></style>