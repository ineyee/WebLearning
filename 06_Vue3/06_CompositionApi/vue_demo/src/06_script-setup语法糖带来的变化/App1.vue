<template>
  <div>
  </div>
</template>

<!--
  变化一：
  语法糖之前，我们必须在script元素内通过“export default {}”的方式导出当前组件，以便外界导入使用
-->
<!--
  变化二：
  语法糖之前，CompositionApi替换掉OptionsApi的东西都需要写在setup函数里，并且setup函数必须通过返回值返回、template模板里才能访问这些东西
-->
<!--
  变化三：
  语法糖之前，我们会通过name属性给组件取个名字
-->
<!--
  变化四：
  语法糖之前，我们在导入其它组件后，必须在“components: {}”属性里注册一下，template模板里才能使用这个组件
-->
<!--
  变化五：
  语法糖之前，我们会通过props属性来接收父组件传递过来的属性
-->
<!--
  变化六：
  语法糖之前，我们会通过emits属性来定义组件要发出的事件，并且是通过当前组件实例的$emit方法发出事件的————“this.$emit("tap", type)”
-->
<script>
import Counter from './Counter.vue';
import { ref } from 'vue';

export default {
  name: "App1",
  components: {
    Counter,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0.0,
    },
  },
  emits: ["tap"],

  setup() {
    const counter = ref(0);
    const add = () => {
      counter.value++;
    };

    return {
      counter,
      add,
    };
  },
};
</script>

<style scoped></style>