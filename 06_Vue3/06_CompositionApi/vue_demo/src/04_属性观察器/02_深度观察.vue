<template>
  <div>
    <button @click="click">按钮</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "DeepWatch",
  setup() {
    const info = ref({
      name: "张三",
      age: 18,
      height: 1.88,
    });
    // 属性观察器只能用在存储属性身上
    // 
    // 默认情况下，CompositionApi的属性观察器不是深度观察，即只改变对象的某个属性时是不会触发观察器的，只有在把对象完全指向另外一个对象时才会触发观察器
    const click = () => {
      // 把对象完全指向另外一个对象时才会触发观察器
      // info.value = {
      //   name: "李四",
      //   age: 18,
      //   height: 1.88,
      // };

      // 默认情况下，只改变对象的某个属性时是不会触发观察器的
      info.value.name = "李四";
    };

    // 默认情况下不是深度观察
    // watch(info, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    // });

    // 我们可以把属性观察器设置成总是深度观察
    watch(info, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    }, {
      deep: true,
    });

    return {
      click,
    };
  },
}
</script>

<style scoped></style>