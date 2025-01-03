<template>
  <div class="house-tab-component">
    <van-tabs class="tabs" v-model:active="_active" color="#FF9854FF" @click-tab="_onClickTab">
      <van-tab title="信息概览"></van-tab>
      <van-tab title="房屋设施"></van-tab>
      <van-tab title="房东介绍"></van-tab>
      <van-tab title="热门评论"></van-tab>
      <van-tab title="预定须知"></van-tab>
      <van-tab title="位置周边"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: "house-tab-component"
});

const _props = defineProps({
  onClickTab: {
    type: Function,
    default: () => null,
  },
});

const _active = ref(0);
const _onClickTab = ({ name }) => {
  if (_props.onClickTab !== null) {
    _props.onClickTab(name);
  }
};

const setSelectedIndex = (index) => {
  _active.value = index;
};
const getSelectedIndex = () => {
  return _active.value;
};
// 把函数暴露出去（但实际开发中我们应该减少这种组件暴露函数出去让父视图调用的行为，这就退回命令式编程了）
defineExpose({
  setSelectedIndex,
  getSelectedIndex,
});
</script>

<style lang="less" scoped>
.house-tab-component {
  .tabs {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;

    height: 40px;
    box-shadow: 0 2px 30px 0 rgba(5, 17, 40, .15);

    background-color: #fff;

    z-index: 99;
  }
}
</style>