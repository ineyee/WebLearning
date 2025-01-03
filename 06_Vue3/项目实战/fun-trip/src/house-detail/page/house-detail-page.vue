<template>
  <div class="scroll-listen-page" ref="_scrollElementRef">
    <HouseTabComponent v-if="_showTabs"></HouseTabComponent>
    <van-nav-bar class="nav-bar" title="房屋详情" safe-area-inset-top left-arrow @click-left="_onClickLeft" />
    <HouseImageComponent ref="_houseImageComponentRef" :cur-house-images="_houseDetailStore.housePics">
    </HouseImageComponent>
    <HouseInfoComponent :cur-house-info="_houseDetailStore.topModule"></HouseInfoComponent>
    <HouseFacilityComponent></HouseFacilityComponent>
    <HouseLandlordComponent></HouseLandlordComponent>
    <HouseCommentComponent></HouseCommentComponent>
    <HouseNoticeComponent></HouseNoticeComponent>
    <HouseMapComponent :cur-house-position="_houseDetailStore.positionModule"></HouseMapComponent>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import HouseInfoComponent from '../component/house-info-component.vue';
import HouseImageComponent from '../component/house-image-component.vue';
import useHouseDetailStore from '../store/house-detail-store';
import HouseFacilityComponent from '../component/house-facility-component.vue';
import HouseLandlordComponent from '../component/house-landlord-component.vue';
import HouseCommentComponent from '../component/house-comment-component.vue';
import HouseNoticeComponent from '../component/house-notice-component.vue';
import HouseMapComponent from '../component/house-map-component.vue';
import HouseTabComponent from '../component/house-tab-component.vue';
import { useElementScroll } from '@/hook/use-scroll';
import { onMounted, ref } from 'vue';

defineOptions({
  name: "house-detail-page"
});

const _router = useRouter();
const _route = useRoute();
const _houseDetailStore = useHouseDetailStore();

let _showTabs = ref(false);
let _showTabsHeight = 0;
const _scrollElementRef = useElementScroll({
  scrollingCallback: ({ contentScrolledHeight }) => {
    _showTabs.value = contentScrolledHeight >= _showTabsHeight;
  },
});

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

const _houseImageComponentRef = ref();
onMounted(() => {
  // 注意：lifeCycleCom是一个Vue组件实例，而非一个原生DOM元素，所以我们得进一步通过它的“$el”属性获取到组件对应的原生DOM元素————即组件的根元素（这也是为什么我们前面推荐一个组件最好只有一个根元素的原因）
  const _houseImageComponent = _houseImageComponentRef.value;
  const _houseImageElement = _houseImageComponent.$el;
  const _houseImageElementRect = _houseImageElement.getBoundingClientRect();
  _showTabsHeight = _houseImageElementRect.top + _houseImageElementRect.height - 40;
});
</script>

<style lang="less" scoped></style>