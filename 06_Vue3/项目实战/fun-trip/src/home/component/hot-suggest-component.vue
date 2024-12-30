<template>
  <div class="hot-suggest-component">
    <div class="list">
      <template v-for="item in _homeStore.hotSuggestsList">
        <!-- 这里的样式也是服务端传过来的，因此我们v-bind下style -->
        <div class="list-item" :style="{ color: item.tagText.color, backgroundColor: item.tagText.background.color }">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '../store/home-store';

defineOptions({
  name: "hot-suggest-component"
});

const _homeStore = useHomeStore();
</script>

<style lang="less" scoped>
.hot-suggest-component {
  padding: 0px 20px 10px 20px;

  .list {
    display: flex;
    flex-wrap: wrap;

    .list-item {
      height: 28px;
      padding: 0px 10px;
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 14px;

      font-size: 12px;
      text-align: center;
      line-height: 28px;
    }
  }
}
</style>