<template>
  <div>
    <!-- template模板里在使用属性时，直接使用属性本身即可，不是使用属性.value，因为Vue会自动解包，这一步跟Flutter里不一致 -->
    <div>当前计数：{{ counter }}</div>
    <button @click="add">➕</button>
  </div>
</template>

<script>
// 因为模块内部使用的是单独导出法，所以导入时必须得用{}
import { useCounter } from './hooks/useCounter';

export default {
  name: "Counter",
  // CompositionApi都是写在setup函数里的
  // 注意一：setup函数返回一个对象，只有对象里返回的东西（属性也好、方法也好）才能在上面template模板里访问，相当于是把OptionsApi里的data选项和methods选项给组合进这个返回值里了
  // 注意二：setup函数里不能使用this，因为这个函数压根没有绑定this————即当前组件这个实例对象
  // 但是setup函数默认会传过来两个参数：props和context，之前我们需要用this的地方可以通过这两个参数来实现
  // 比如之前访问data里的属性需要通过this，现在直接就能访问到；之前访问props里的属性需要通过this，现在是通过props；之前通过this.$emit发出事件，现在通过context.emit发出事件
  setup(props, context) {
    return {
      // 计数器功能的逻辑，展开运算符
      ...useCounter(),
    };
  },
}
</script>

<style scoped></style>