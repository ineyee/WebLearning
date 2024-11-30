<template>
  <button ref="button" @click="onClick">切换显隐</button>
  <LifeCycle ref="lifeCycle" v-if="show === true"></LifeCycle>
</template>

<script>
import LifeCycle from './LifeCycle.vue';

export default {
  name: "App",

  components: {
    LifeCycle,
  },

  data() {
    return {
      show: true,
    };
  },
  methods: {
    onClick() {
      this.show = !this.show;
    },
  },

  // 这里顺带说一下Vue里怎么获取一个元素或组件的位置和大小
  // 第一步：给元素或组件的ref属性设置一个唯一标识，这样一来这个元素或组件就会被添加到当前组件实例的$ref属性里了
  // 第二步：通过“this.$refs.唯一标识”获取到元素或组件（注意在Vue里千万不要再使用querySelector这种原生DOM操作了）
  // 第三步：通过getBoundingClientRect函数获取一个元素或组件的位置和大小
  mounted() {
    // 注意：buttonEle直接就是一个原生DOM元素，因为它是系统自带的HTML元素、而不是我们自定义的组件
    const buttonEle = this.$refs.button;
    const buttonEleRect = buttonEle.getBoundingClientRect();
    console.log("buttonEle的位置和大小：", buttonEleRect);

    // 注意：lifeCycleCom是一个Vue组件实例，而非一个原生DOM元素，所以我们得进一步通过它的“$el”属性获取到组件对应的原生DOM元素————即组件的根元素（这也是为什么我们前面推荐一个组件最好只有一个根元素的原因）
    const lifeCycleCom = this.$refs.lifeCycle;
    const lifeCycleEle = lifeCycleCom.$el;
    const lifeCycleComRect = lifeCycleEle.getBoundingClientRect();
    console.log("lifeCycleCom的位置和大小：", lifeCycleComRect);
  },
}
</script>

<style scoped></style>