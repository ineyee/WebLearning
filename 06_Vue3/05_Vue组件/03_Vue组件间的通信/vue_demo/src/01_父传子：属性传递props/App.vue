<!-- 这里是父组件 -->

<template>
  <!--
    父组件如何传递参数呢？
    
    非常简单，直接在子组件身上v-bind绑定自定义属性就可以了，当然自定义属性的名字要跟子组件里暴露出来的属性名保持一致，不能乱写
  -->
  <Info :name="'张三'" :age="18" :height="1.88" :friends="friends"></Info>
  <Info :name="'李四'" :age="19" :height="1.99" :job="job" :jump-meter="jump"></Info>
</template>

<script>
import Info from "./Info.vue";

export default {
  name: "App",
  components: {
    Info,
  },

  data() {
    return {
      friends: [{ name: '王五' }],
      job: { name: '厨师' },
    };
  },
  methods: {
    jump() {
      return "2米5";
    },
  },
}
</script>

<style></style>