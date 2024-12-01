<!--
  在某些场景下，视图里展示的内容不直接是某个数据，而是某些数据结合在一起才能得出来的结果
  最佳实践就是用计算属性来把这些数据给结合起来
  Vue建议对于响应式数据的任何复杂逻辑，都通过计算属性来处理

  计算属性对比表达式和methods：可以满足“视图层最好是拿到数据直接展示，而不要在视图层里调用函数才能得到这个数据”，同时计算属性会做缓存——当它一来的其它数据不发生变化时、无论我们访问多少次计算属性、计算属性都只是计算一次，而表达式和methods就是用多少次就计算多少次了
  计算属性对比存储属性：存储属性会占用对象的内存，计算属性不会占用对象的内存、因为计算属性在编译后本质其实就是方法、只不过在语法层面“这个方法允许我们像使用属性那样调用它而已”，可以减少我们对关联较强的属性间的维护工作
-->

<template>
  <div>
    <div>圆的面积：{{ area }}</div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: "Area",
  setup() {
    const width = ref(100);
    const height = ref(100);

    // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
    // CompositionApi里的computed计算属性是基于响应式实现的，所以计算属性所依赖的属性必须是响应式的，并且计算属性本身也是响应式的

    // 只有getter时，可以使用语法糖写法，直接传给computed函数一个getter函数即可
    const area = computed(() => {
      return width.value * height.value;
    });

    // 有setter时就只能通过完整写法了，因为setter没有语法糖
    // computed函数就只能接收一个对象了，里面有setter和getter方法
    // const area = computed({
    //   get() {
    //     return width.value * height.value;
    //   },
    //   set(newArea) {
    //     width.value = Math.sqrt(newArea);
    //     height.value = Math.sqrt(newArea);
    //   },
    // });

    return {
      area,
    };
  },
}
</script>

<style scoped></style>