<template>
  <div class="scroll-listen-page" ref="_scrollElementRef">
    <HouseTabComponent v-if="_showTabs" ref="_houseTabComponentRef" :onClickTab="_onClickTab"></HouseTabComponent>
    <van-nav-bar class="nav-bar" title="房屋详情" safe-area-inset-top left-arrow @click-left="_onClickLeft" />
    <HouseImageComponent ref="_houseImageComponentRef" :cur-house-images="_houseDetailStore.housePics">
    </HouseImageComponent>
    <HouseInfoComponent :cur-house-info="_houseDetailStore.topModule"></HouseInfoComponent>
    <HouseFacilityComponent ref="_houseFacilityComponentRef"></HouseFacilityComponent>
    <HouseLandlordComponent ref="_houseLandlordComponentRef"></HouseLandlordComponent>
    <HouseCommentComponent ref="_houseCommentComponentRef"></HouseCommentComponent>
    <HouseNoticeComponent ref="_houseNoticeComponentRef"></HouseNoticeComponent>
    <HouseMapComponent ref="_houseMapComponentRef" :cur-house-position="_houseDetailStore.positionModule">
    </HouseMapComponent>
    <div class="bottom">
      <div>安心订·放心住</div>
      <div>各种长文本信息</div>
    </div>
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

    let curSectionIndex = _sectionTopList.length - 1;
    for (let i = 0; i < _sectionTopList.length; i++) {
      const value = _sectionTopList[i];
      if (value >= contentScrolledHeight) {
        curSectionIndex = i - 1;
        break;
      }
    }

    if (curSectionIndex !== _houseTabComponentRef.value?.getSelectedIndex()) {
      _houseTabComponentRef.value?.setSelectedIndex(curSectionIndex);
    }
  },
});
const _onClickTab = (selectedIndex) => {
  switch (selectedIndex) {
    case 0:
      _scrollElementRef.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      break;
    case 1:
      _scrollElementRef.value.scrollTo({
        // 这里的offsetTop跟下面的getBoundingClientRect().top值是一样的
        top: _houseFacilityComponentRef.value.$el.offsetTop - 40,
        behavior: "smooth",
      });
      break;
    case 2:
      _scrollElementRef.value.scrollTo({
        top: _houseLandlordComponentRef.value.$el.offsetTop - 40,
        behavior: "smooth",
      });
      break;
    case 3:
      _scrollElementRef.value.scrollTo({
        top: _houseCommentComponentRef.value.$el.offsetTop - 40,
        behavior: "smooth",
      });
      break;
    case 4:
      _scrollElementRef.value.scrollTo({
        top: _houseNoticeComponentRef.value.$el.offsetTop - 40,
        behavior: "smooth",
      });
      break;
    case 5:
      _scrollElementRef.value.scrollTo({
        top: _houseMapComponentRef.value.$el.offsetTop - 40,
        behavior: "smooth",
      });
      break;
  }
};

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
const _houseFacilityComponentRef = ref();
const _houseLandlordComponentRef = ref();
const _houseCommentComponentRef = ref();
const _houseNoticeComponentRef = ref();
const _houseMapComponentRef = ref();
onMounted(() => {
  // 注意：lifeCycleCom是一个Vue组件实例，而非一个原生DOM元素，所以我们得进一步通过它的“$el”属性获取到组件对应的原生DOM元素————即组件的根元素（这也是为什么我们前面推荐一个组件最好只有一个根元素的原因）
  const _houseImageComponent = _houseImageComponentRef.value;
  const _houseImageElement = _houseImageComponent.$el;
  const _houseImageElementRect = _houseImageElement.getBoundingClientRect();
  _showTabsHeight = _houseImageElementRect.top + _houseImageElementRect.height - 40;

  // 存储各个section的top
  _sectionTopList.push(0);
  _sectionTopList.push(_houseFacilityComponentRef.value.$el.offsetTop + 40);
  _sectionTopList.push(_houseLandlordComponentRef.value.$el.offsetTop + 40);
  _sectionTopList.push(_houseCommentComponentRef.value.$el.offsetTop + 40);
  _sectionTopList.push(_houseNoticeComponentRef.value.$el.offsetTop + 40);
  _sectionTopList.push(_houseMapComponentRef.value.$el.offsetTop + 40);
});

// 界面滚动到不同的section时驱动tabs切换
const _sectionTopList = [];
const _houseTabComponentRef = ref();
</script>

<style lang="less" scoped>
.scroll-listen-page {
  .bottom {
    height: 666px;

    text-align: center;
  }
}
</style>