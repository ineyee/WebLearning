<template>
  <div class="search-button-component">
    <div class="search-button" @click="_onSearch">
      开始搜索
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineOptions({
  name: "search-button-component"
});

const _router = useRouter();
const _onSearch = () => {
  _router.push("/searchPage");
};
</script>

<style lang="less" scoped>
.search-button-component {
  padding: 10px 20px 10px 20px;

  .search-button {
    height: 38px;
    border-radius: 19px;

    font-size: 18px;
    font-weight: 38px;
    color: #fff;
    text-align: center;
    line-height: 38px;

    background-image: linear-gradient(90deg, #FA8C1D, #FCAF3F);
  }
}
</style>