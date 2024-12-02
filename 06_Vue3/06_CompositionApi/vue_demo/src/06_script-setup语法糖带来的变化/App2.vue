<template>
  <div>
  </div>
</template>

<!--
  变化一：
  语法糖之后，我们只需要给script元素加个setup属性，就可以不用写“export default {}”来导出当前组件了，setup属性会自动导出当前组件
  当然现在没了“export default {}”这个组件实例的“{}”，那我们的代码写在哪里呢？下面就说
-->
<!--
  变化二：
  语法糖之后，我们只需要给script元素加个setup属性，就可以不写setup函数了，那些替换掉的东西可以直接写在script元素里，就像我们原生在script元素里写JS代码那样，这个setup属性会自动返回在script元素【顶层】定义的属性和函数等东西、以便template模板里能访问
-->
<!--
  变化三：
  语法糖之后，我们会通过defineOptions的name来给组件取个名字
-->
<!--
  变化四：
  语法糖之后，我们只需要给script元素加个setup属性，就可以不用写“components: {}”属性来注册组件了，直接导入其它组件，template模板里就能使用这个组件，因为setup属性会自动注册在script元素【顶层】导入的这个组件、以便template模板里能访问
-->
<!--
  变化五：
  语法糖之后，我们会通过defineProps函数来接收父组件传递过来的属性
-->
<!--
  变化六：
  语法糖之后，我们会通过defineEmits函数来定义组件要发出的事件，并且defineEmits函数又会返回一个函数————类似于之前的$emit函数，我们会通过返回的这个函数来发出事件————“emitFn("tap", type)”
-->
<script setup>
import Counter from './Counter.vue';

defineOptions({
  name: "App2",
});
defineProps({
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
});
const emitFn = defineEmits(["tap"]);

const counter = ref(0);
const add = () => {
  counter.value++;
};
</script>

<style scoped></style>