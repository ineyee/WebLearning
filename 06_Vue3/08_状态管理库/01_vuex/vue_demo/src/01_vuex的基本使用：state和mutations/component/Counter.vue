<template>
  <div>
    <!--
      只要我们在createApp的地方注册了全局单例store，那么在template里就可以通过$store来拿到这个全局单例store
 
      组件可以直接读取state来展示
    -->
    <div>当前计数：{{ $store.state.counter }}</div>
    <button @click="onClick">+1</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

defineOptions({
  name: "Counter",
});

/*
  只要我们在createApp的地方注册了全局单例store，那么在JS里就可以通过useStore这个hook函数拿到这个全局单例store（千万不要直接导入，CompositionApi都是用hook函数）

  组件不能直接修改state，只能通过commit mutation的方式来修改state
  当修改是个同步行为时可以直接通过commit mutation来修改state
*/
const store = useStore();
const onClick = () => {
  // 第一个参数是store里mutation里的函数名
  // 第二个参数就是我们自己想传递的其它参数了，任意类型
  store.commit("add", "Hello VueX");
};
</script>

<style lang="less" scoped></style>