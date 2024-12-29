<template>
  <div class="city-page tab-bar-indirect-page">
    <!-- 搜索 -->
    <van-search v-model="searchedText" placeholder="城市/区域/位置" shape="round" :show-action="true" @cancel="onCancel" />

    <!-- tab -->
    <van-tabs v-model:active="selectedIndex" color="#FF9854FF">
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="海外"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
</script>

<style lang="less" scoped>
.city-page {
  /*
    局部修改样式变量
    记得使用下!important来确保我们这里样式变量的优先级比默认的那个样式变量高
  */
  --van-search-left-icon-color: var(--main-color) !important;
}
</style>