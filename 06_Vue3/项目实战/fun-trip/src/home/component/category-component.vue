<template>
  <div class="category-component">
    <div class="list">
      <template v-for="item in _homeStore.categories">
        <div class="list-item">
          <img :src="item.subPictureUrl" alt="">
          <div>{{ item.title }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '../store/home-store';

defineOptions({
  name: "category-component"
});

const _homeStore = useHomeStore();
</script>

<style lang="less" scoped>
.category-component {
  padding: 10px 20px 10px 20px;

  .list {
    display: flex;
    overflow-x: scroll;

    // 隐藏掉滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .list-item {
      // width: 70px;
      // item横向放不下时，这个值默认为1会使得item压缩显示，这里不让item压缩，这样一来显示肯定会超出屏幕，导致整个界面都可以横向滚动，于是我们就得设置下这个元素父视图的overflow-x为scroll来保证只有这一部分滚动而不连带整个界面滚动（就好像城市界面，我们设置ListView滚动不连带界面滚动就是给ListView本身设置一下overflow-y为scroll那样，不想连带界面滚动时，谁想滚动就给谁设置overflow）
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;

      &:not(:last-child) {
        margin-right: 10px;
      }

      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>