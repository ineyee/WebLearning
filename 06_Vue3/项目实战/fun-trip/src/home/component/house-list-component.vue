<template>
  <div class="house-list-component">
    <div class="title">
      热门精选
    </div>
    <van-grid :column-num="2" :border="false" :center="false" gutter="10px">
      <van-grid-item v-for="item in _homeStore.houseList" :key="item.data.houseId">
        <template v-if="item.discoveryContentType === 3">
          <house-list-item-t3-component :data="item.data"></house-list-item-t3-component>
        </template>
        <template v-else-if="item.discoveryContentType === 9">
          <house-list-item-t9-component :data="item.data"></house-list-item-t9-component>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
import HouseListItemT3Component from '@/component/house-list-item-component/house-list-item-t3-component.vue';
import HouseListItemT9Component from '@/component/house-list-item-component/house-list-item-t9-component.vue';
import useHomeStore from '../store/home-store';

defineOptions({
  name: "house-list-component"
});

const _homeStore = useHomeStore();
</script>

<style lang="less" scoped>
.house-list-component {
  --van-grid-item-content-padding: 0px !important;
  --van-grid-item-content-background: transparent !important;

  padding: 10px;

  background-color: #f5f7f9;

  .title {
    height: 48px;
    padding: 0px 10px 0px 10px;

    font-size: 20px;
    font-weight: 500;
    line-height: 48px;
  }
}
</style>