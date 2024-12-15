<template>
  <div>
    <OptionsApi></OptionsApi>
    <CompositionApi1></CompositionApi1>
    <CompositionApi2></CompositionApi2>
  </div>
</template>

<script>
import OptionsApi from './OptionsApi.vue';
import CompositionApi1 from './CompositionApi1.vue';
import CompositionApi2 from './CompositionApi2.vue';

export default {
  name: "App",
  components: {
    OptionsApi,
    CompositionApi1,
    CompositionApi2,
  },
}
</script>

<style scoped></style>

<!--
  注意：
  （1）OptionsApi里的状态默认都是响应式的，我们直接使用就行，不存在什么value不value的
  （2）CompositionApi里的状态默认都不是响应式的，定义时需要我们自己ref，使用时template里不需要加.value、其他地方使用时都得加.value
  （3）而后面我们学到的用vuex或pinia来进行状态管理时，它们的状态默认也都是响应式的，我们直接使用就行，也不存在什么value不value的
-->