<template>
  <div class="search-bar-component" @click="_onSearch">
    <div class="begin-end">
      <div class="item">
        <div class="tip">住</div>
        <div class="date"> {{ _homeStore.beginDateString }}</div>
      </div>
      <div class="item">
        <div class="tip">离</div>
        <div class="date"> {{ _homeStore.endDateString }}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="text-input">关键字/位置/民宿名</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useHomeStore from '../store/home-store';

defineOptions({
  name: "search-bar-component"
});

const _homeStore = useHomeStore();

const _router = useRouter();
const _onSearch = () => {
  _router.push("/searchPage");
};
</script>

<style lang="less" scoped>
.search-bar-component {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;

  height: 45px;
  padding: 10px 16px;
  box-shadow: 0 2px 30px 0 rgba(5, 17, 40, .15);

  background-color: #fff;

  display: flex;

  z-index: 99;

  .begin-end {
    width: 60px;
    padding-left: 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    background: #f2f4f6;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .item {
      display: flex;

      font-size: 10px;

      .tip {
        color: #999;
      }

      .date {
        margin-left: 2px;

        font-weight: 500;
        color: #333;
      }
    }
  }

  .line {
    width: 1px;
  }

  .text-input {
    padding: 0px 10px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    background: #f2f4f6;

    font-size: 14px;
    color: #999;
    text-align: left;
    line-height: 45px;

    flex: 1;
  }
}
</style>