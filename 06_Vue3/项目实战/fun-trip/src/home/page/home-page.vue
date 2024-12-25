<template>
  <div class="home-page">
    <nav-bar></nav-bar>
    <banner-component></banner-component>
  </div>
</template>

<script setup>
import NavBar from '../../component/nav-bar.vue';
import BannerComponent from '../component/banner-component.vue';

defineOptions({
  name: "home-page"
});
</script>

<style lang="less" scoped></style>