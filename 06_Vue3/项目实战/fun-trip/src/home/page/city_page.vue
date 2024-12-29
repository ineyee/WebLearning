<template>
  <div class="city-page tab-bar-indirect-page">
    <!-- 搜索 -->
    <van-search class="search" v-model="searchedText" placeholder="城市/区域/位置" shape="round" :show-action="true"
      @cancel="onCancel" />

    <!-- tab -->
    <van-tabs class="tabs" v-model:active="selectedIndex" color="#FF9854FF">
      <van-tab v-for="item in cityStore.cityGroupTitleList" :title="item"></van-tab>
    </van-tabs>

    <!-- 列表 -->
    <div class="list">
      <div v-for="index in 100">
        哈哈哈{{ index }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '../store/city-store';

defineOptions({
  name: "cityPage"
});

const router = useRouter();

// 搜索
const searchedText = ref("");
const onCancel = () => {
  router.back();
};

// tab
const selectedIndex = ref(0);
const cityStore = useCityStore();
cityStore.getCityAll();
</script>

<style lang="less" scoped>
.city-page {
  /*
    局部修改样式变量
    记得使用下!important来确保我们这里样式变量的优先级比默认的那个样式变量高
  */
  --van-search-left-icon-color: var(--main-color) !important;

  .search {
    height: 54px;
  }

  .tabs {
    height: 44px;
  }

  // 在CSS里，默认情况下，如果界面里有列表，那么其实是整个界面在滚动，而不是列表这一部分在滚动，类似于Flutter里设置了ListView的shrinkWrap=true包裹所有的item + NeverScroll + 交给界面去滚动
  // 而如果我们只想让列表滚动而不是界面整体滚动，那只需要给列表一个固定的高度 + 设置一下overflow-y就可以了，就像Flutter里如果我们不设置shrinkWrap + NeverScroll，就必须给ListView设置一个固定高度一样、否则就会报hasSize那个错。这样一来Vue里搭界面就跟Flutter里搭界面很像了，需要摆什么控件就依次摆什么控件就可以了，就不用频繁使用定位相关的属性来搞了，顶部摆的东西默认不会滚动（因为现在不是界面在滚动了、原来默认是的），只有列表的部分在滚动
  .list {
    height: calc(100vh - 54px - 44px);
    overflow-y: scroll;
  }
}
</style>