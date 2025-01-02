<template>
  <div class="app">
    <!-- 使用router-view元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在router-view元素的位置 -->
    <router-view></router-view>
    <tab-bar></tab-bar>
    <loading-component v-show="_commonStore.isShowLoading"></loading-component>
  </div>
</template>

<script setup>
import TabBar from './tab-bar/tab-bar';
import LoadingComponent from './component/loading-component.vue';
import useCommonStore from './store/common-store';

defineOptions({
  name: "app"
});

const _commonStore = useCommonStore();
</script>

<style lang="less" scoped></style>