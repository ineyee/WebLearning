<template>
  <button ref="buttonRef" @click="onClick">切换显隐</button>
  <LifeCycle ref="lifeCycleRef" v-if="show === true"></LifeCycle>
</template>

<script>
import { onMounted, ref } from 'vue';
import LifeCycle from './LifeCycle.vue';

export default {
  name: "App",
  components: {
    LifeCycle,
  },
  setup() {
    const show = ref(true);
    const buttonRef = ref();
    const lifeCycleRef = ref();

    const onClick = () => {
      show.value = !show.value;
    }

    // 这里顺带说一下Vue里CompositionApi怎么获取一个元素或组件的位置和大小，因为没法像之前OptionsApi那样在setup函数里使用this了
    // 第一步：给元素或组件定义一个ref并return出去，以便能在template模板里使用作为唯一标识，并且将来我们就是通过相应的ref来获取元素或组件
    // 第二步：给元素或组件的ref属性设置一个唯一标识
    // 第三步：通过“元素或组件.value”获取到元素或组件（注意在Vue里千万不要再使用querySelector这种原生DOM操作了）
    // 第四步：通过getBoundingClientRect函数获取一个元素或组件的位置和大小
    onMounted(() => {
      // 注意：buttonEle直接就是一个原生DOM元素，因为它是系统自带的HTML元素、而不是我们自定义的组件
      const buttonEle = buttonRef.value;
      const buttonEleRect = buttonEle.getBoundingClientRect();
      console.log("buttonEle的位置和大小：", buttonEleRect);

      // 注意：lifeCycleCom是一个Vue组件实例，而非一个原生DOM元素，所以我们得进一步通过它的“$el”属性获取到组件对应的原生DOM元素————即组件的根元素（这也是为什么我们前面推荐一个组件最好只有一个根元素的原因）
      const lifeCycleCom = lifeCycleRef.value;
      const lifeCycleEle = lifeCycleCom.$el;
      const lifeCycleComRect = lifeCycleEle.getBoundingClientRect();
      console.log("lifeCycleCom的位置和大小：", lifeCycleComRect);
    });

    return {
      show,
      buttonRef,
      lifeCycleRef,
      onClick,
    };
  },
}
</script>

<style scoped></style>