<template>
  <div @click="add">{{ counter }}</div>
</template>

<script>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
  name: "LifeCycle",
  setup() {
    const counter = ref(0);
    const add = () => {
      counter.value++;
    };

    // 1、OptionsApi里的beforeCreate和created没了，直接换成了setup
    // Vue建议原来在beforeCreate和created做的事都直接放到setup里执行即可
    // 
    // 组件被初始化完成，类似于Flutter里的initState，只会被调用一次
    // 我们通常会在这个函数里发起网络请求、添加事件监听等
    // 
    // 组件被初始化完成后，就意味着组件的状态（数据）、交互（事件）等都被初始化好了，我们在这个函数里就可以访问它们了
    console.log("setup");

    // 2.1 组件被挂载之前
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    // 2.2 组件被挂载完成，类似于Flutter里的addPostFrameCallback，只会被调用一次
    // 我们通常会在这个函数里获取元素的位置、大小等信息
    // 
    // 组件被挂载的过程：
    // （1）创建组件对应的虚拟DOM对象、插入到虚拟DOM Tree
    // （2）创建虚拟DOM对象对应的真实DOM对象、插入到真实DOM Tree
    // （3）真实DOM Tree attach CSS得到Render Tree
    // （4）Render Tree进行布局得到最终完整的Render Tree
    // （5）浏览器对最终完整的Render Tree进行绘制得到某一帧画面所有的像素点
    // （6）浏览器拿着像素点display在显示器上呈现给用户看
    // 所以组件被挂载完成后，就意味着组件的的确确已经渲染结束了、用户已经能看到了，我们在这个函数里就可以在访问组件对象的DOM对象了，beforeMount是不能访问的，因为组件还没被渲染结束
    onMounted(() => {
      console.log("onMounted");
    });

    // 3.1 界面被刷新前
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    // 3.2 界面被刷新完成，类似于Flutter里的build，会被调用多次、只要数据发生变化就会被触发
    onUpdated(() => {
      console.log("onUpdated");
    });

    // 4.1 组件被卸载之前
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    // 4.2 组件被卸载完成，类似于Flutter里的dispose，只会被调用一次
    // 我们通常会在这个函数里释放一些资源、取消事件监听等，避免内存泄漏
    // 
    // 组件被卸载的过程：
    // （1）从虚拟Dom Tree中移除组件对应的虚拟Dom对象
    // （2）从真实Dom Tree中移除虚拟Dom对象对应的真实DOM对象
    // （3）将组件这个对象本身从内存中销毁
    // 所以组件被卸载后，就意味着组件的的确确已经从内存中被销毁了
    onUnmounted(() => {
      console.log("onUnmounted");
    });

    return {
      counter,
      add,
    };
  },
}
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;

  background-color: red;

  text-align: center;
  line-height: 100px;
}
</style>