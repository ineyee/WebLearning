<template>
  <div class="city-page tab-bar-indirect-page">
    <van-search v-model="searchedText" placeholder="城市/区域/位置" shape="round" :show-action="true" @cancel="onCancel" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: "cityPage"
});

const searchedText = ref("");
const router = useRouter();

const onCancel = () => {
  router.back();
};
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