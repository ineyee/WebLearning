<template>
  <div>
    <!-- 直接读取，不需要什么.state、.getters -->
    <div>当前计数：{{ counter1Store.counter }}</div>
    <div>双倍计数：{{ counter1Store.doubleCounter }}</div>
    <button @click="onClick">+1</button>
    <button @click="resetState">重置所有的state</button>
  </div>
</template>

<script setup>
import useCounter1Store from '@/store/Counter1Store';

defineOptions({
  name: "Counter1",
});

const counter1Store = useCounter1Store();
const onClick = () => {
  // 直接修改，不需要什么commit
  counter1Store.counter++;
};
// 直接调用，不需要什么dispatch
counter1Store.fetchCounter();
const resetState = () => {
  // 调用$reset函数即可
  counter1Store.$reset();
};
</script>

<style lang="less" scoped></style>