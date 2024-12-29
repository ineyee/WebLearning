<!--
  三方组件双向绑定v-model的处理
  我们看到van-tabbar双向绑定了一个数据active，双向绑定就意味着var-tabbar在使用这个数据active做展示并且var-tabbar本身的交互又会反过来改变这个数据active
  
  而官方文档里说”active这个数据就是选中标签的索引值“，这样看来的确如此，var-tabbar需要拿选中标签的索引值来点亮选中的那个item，同时切换item时又会反过来改变选中标签的索引值，符合双向绑定的含义

  实际开发中，我们总是需要自己创建这么一个数据以便三方组件顺利实现双向绑定：
  1、并且三方组件已经给我们提供好了数据的名称、比如这里的active，我们可以直接用这个名称来定义一个属性，当然也可以自定义数据的名称，比如我们这里就觉得selectedIndex要比active更好理解，所以我们就可以自定义一个名字叫做selectedIndex的属性，不过要记得把van-tabbar默认双向绑定的那个数据名也改成我们自定义的。我们只需要定义好这个属性并且给个默认值就完事了，三方组件内部就已经做好双向绑定的事了，接下来我们就是通过三方组件暴露出来的监听函数去监听属性值的变化就可以了
  2、前面我们已经提到过，OptionsApi里的数据默认就是响应式的，用vuex或pinia状态管理库管理的数据默认也是响应式的，但是CompositionApi里的数据默认不是响应式的，而这里我们用的是CompositionApi，并且因为这个数据仅仅影响组件内部的状态，所以也不计划把它交给状态管理库去管理来增强内聚性（就像Flutter里有时我们会创建StatefulWidget，然后在Widget内部定义一些仅影响Widget内部状态的变量来实现某些功能一样），因此我们得手动用ref来把属性变成响应式的，不搞成响应式数据变化时UI就不会跟着变化
-->
<template>
  <div class="tab_bar">
    <!-- 双向绑定的属性名原来叫active，现在改成我们自定义的属性名selectedIndex -->
    <!-- van-tabbar给我们提供了change事件，切换item时就会触发这个事件 -->
    <van-tabbar v-model="selectedIndex" @change="selectedIndexDidChange" :safe-area-inset-bottom="true">
      <van-tabbar-item icon="home-o" :name="0">标签</van-tabbar-item>
      <van-tabbar-item icon="search" :name="1">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :name="2">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" :name="3">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: "TabBar"
});

// 我们只需要定义好这个属性并且给个默认值就完事了，三方组件内部就已经做好双向绑定的事了
const selectedIndex = ref(0);
// 通过三方组件暴露出来的监听函数去监听属性值的变化
const selectedIndexDidChange = (newSelectedIndex) => {
  console.log(`点击了标签 ${newSelectedIndex}`);
};
</script>

<style lang="less" scoped></style>

<!--
  额外的补充

  1、我们可以从官方文档里看到三方组件的双向绑定默认绑定的是当前标签的索引值，而具体怎么把当前标签的索引值绑定上去的————其实官方文档里也说明了是通过van-tabbar-item的name属性，这个name属性可以是个number值也可以是个string值
  所以说默认情况下，上面的代码完整的写法其实如下，也就是给每个van-tabbar-item都加上name属性，因为值是数字，所以用了v-bind
  <van-tabbar v-model="selectedIndex" @change="selectedIndexDidChange">
    <van-tabbar-item icon="home-o" :name="0">标签</van-tabbar-item>
    <van-tabbar-item icon="search" :name="1">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o" :name="2">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" :name="3">标签</van-tabbar-item>
  </van-tabbar>

  2、实际开发中，如果不想绑定当前标签的索引值，而是想直接绑定当前标签的某个文本类的属性，以便在切换时能直接那这个值来请求数据之类，我们也可以修改双向绑定的东西，那就是直接改name就可以了，因为就是通过name来传递要双向绑定什么的，比如我们可以改成下面这样，因为值就是字符串，所以不用v-bind，这样一来，在切换item时，监听回调里给到我们的就直接是选中的字符串了，我们就不用再用index去映射出字符串再发起网络请求了，少了这一步在某些场景下非常有用
  <van-tabbar v-model="selectedIndex" @change="selectedIndexDidChange">
    <van-tabbar-item icon="home-o" name="home">标签</van-tabbar-item>
    <van-tabbar-item icon="search" name="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="friends">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="setting">标签</van-tabbar-item>
  </van-tabbar>
-->