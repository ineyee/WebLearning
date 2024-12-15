<template>
  <div>
    <!--
      只要我们在createApp的地方注册了全局单例store，那么在template里就可以通过$store来拿到这个全局单例store
 
      组件可以直接读取state来展示
      只不过用了modules之后，要指定读取哪个module里的state，写法就是”$store.state.module“，注意不是”$store.module.state“，除了获取state是一路点语法，其它东西都是“模块/内容”这种写法来指定模块

      组件可以直接读取getter来展示
      只不过用了模块和命名空间之后，需要指定哪个模块，写法就是“模块/内容”
    -->
    <div>当前计数：{{ $store.state.Counter1Module.counter }}</div>
    <div>双倍计数：{{ $store.getters["Counter1Module/doubleCounter"] }}</div>
    <button @click="onClick">+1</button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

defineOptions({
  name: "Counter1",
});

/*
  只要我们在createApp的地方注册了全局单例store，那么在JS里就可以通过useStore这个hook函数拿到这个全局单例store（千万不要直接导入，CompositionApi都是用hook函数）

  组件不能直接修改state，只能通过commit mutation的方式来修改state
  当修改是个同步行为时可以直接通过commit mutation来修改state

  只不过用了模块和命名空间之后，需要指定哪个模块，写法就是“模块/内容”
*/
const store = useStore();
const onClick = () => {
  // 第一个参数是store里mutation里的函数名
  // 第二个参数就是我们自己想传递的其它参数了，任意类型
  store.commit("Counter1Module/add", "Hello VueX");
};
</script>

<style lang="less" scoped></style>