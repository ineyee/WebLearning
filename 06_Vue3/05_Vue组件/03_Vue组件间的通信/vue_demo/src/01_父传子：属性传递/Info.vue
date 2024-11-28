<!-- 这里是子组件 -->

<template>
  <div>姓名：{{ name }}</div>
  <div>年龄：{{ age }}</div>
  <div>身高：{{ height }}</div>
  <div>朋友：{{ friends.length > 0 ? friends : "暂无朋友" }}</div>
  <div>工作：{{ Object.keys(job).length > 0 ? job : "暂无工作" }}</div>
  <div>跳远：{{ jumpMeter !== null ? jumpMeter() : "暂无成绩" }}</div>
</template>

<script>
export default {
  name: "Info",

  // props和data里的属性名最好不要重名，否则会报“重复定义”的警告

  /*
    子组件如何接收参数呢？

    非常简单，props属性专门就是用来接收父组件传递过来的参数的，它的value是一个对象（类似于Flutter里Widget构造函数里的参数）
    我们需要指定属性的类型
    我们需要指定属性是否必传，必传时就不用给默认值了，不必传是就得给个默认值

    那常见的类型有哪些呢？
    基本数据类型：Boolean、Number、String
    对象数据类型：Array、Object、Function
      注意：当类型为Array、Object时，默认值必须通过default函数来返回；当类型为Function时，default函数就是默认函数，直接在default函数里编写代码就可以了，当然我们也可以像Flutter里经常做的那样把函数的默认搞成个null
  */
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
    friends: {
      type: Array,
      default() {
        return [];
      },
    },
    job: {
      type: Object,
      default() {
        return {};
      },
    },
    // 属性名如果是多个单词的组合，可以用小驼峰——jumpMeter，也可以用中划线——"jump-meter"
    // 使用的地方小驼峰和中划线都可以，Vue内部会自动处理
    jumpMeter: {
      type: Function,
      default: null,
    }
  },
  data() {
    return {

    };
  },
}
</script>

<style></style>