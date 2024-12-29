<!--
  实际开发中，我们可能还需要修改tabBar的样式，比如选中和未选中的颜色、图标的大小和文本的大小等
  我们要做的第一步就是先看看三方组件有没有给我们提供现成的属性能满足我们的需求，比如修改选中的颜色和未选中的颜色，van-tabbar就给我们提供两个属性：active-color和inactive-color，我们直接用这两个属性来修改就可以了；但是van-tabbar没有给我们提供修改图标的大小和文本的大小的属性，此时我们才需要考虑自定义三方组件的样式来覆盖三方组件默认的样式来满足我们的需求

  方案一：如果我们用了插槽，这就意味着图标元素和文本元素完全是我们自己写的，它们的样式我们完全可以自由掌控，因此我们可以直接自定义它们的样式来实现，比如第三个tab好友

  方案二：如果我们没用插槽，那就只能修改三方组件对应属性的值了
  第一步：在浏览器里选中相应的元素，然后在Elements -> Styles里看一下图标元素大小所对应的属性及其默认值到底是多少，比如这里我们就看到图标元素的大小为”font-size: var(--van-tabbar-item-icon-size);“，因为图标元素用的是字体图标i，所以它的大小所对应的属性实际上是看字体大小，而它的默认值也不是一个写死的值，而是一个样式变量”--van-tabbar-item-icon-size“，我们在浏览器里就可以看到样式变量”--van-tabbar-item-icon-size“的值为22px
  第二步：找到相应的属性及其默认值后，接下来我们就可以修改属性的值为我们想要的值了，不过从修改后影响范围的大小来看又可以分为三种修改方式：
    方式一：只修改图标元素本身的大小，即把图标元素本身font-size属性的值由使用样式变量--van-tabbar-item-icon-size直接改成一个其它值，这种方式的影响范围最小，因为我们并没有修改样式变量，所以绝对不会影响其它元素，这种方式比较精准，如果我们不太明确到底什么地方使用了该样式变量，怕改动样式变量后影响其它元素，那就可以使用这种精准修改的方式，绝对靠谱，比如我们不知道文本的字体大小是不是也用得这个样式变量，万一改了图标大小，文本字体大小也跟着变了那就不好了
    方式二：局部修改样式变量--van-tabbar-item-icon-size，即只在当前class="tab_bar"内重写此变量，这种方式的影响范围为仅影响当前tab_bar，可以避免tab_bar以外的其它地方也使用了该变量而导致误覆盖，比如我们项目里好几个地方都使用了vant_tabbar，这里的图标大小要自定义，另一个地方的图标大小却又要求采取默认，那就可以使用这个局部修改样式的方式，仅影响当前tab_bar，而不影响另外一个tab_bar
    方式三：全局修改样式变量--van-tabbar-item-icon-size，有的情况下我们的确需要全局修改某些样式变量以影响所有使用到该样式变量的组件，免得要该很多地方，但这是建立在我们明确知道什么地方都使用了该变量的前提下
    这三种方式要根据具体的场景来做选择，见common.css
-->
<template>
  <div class="tab_bar">
    <!--
      假设选中颜色为橙色，未选中颜色为灰色
      我们直接使用三方组件给我们提供的属性来修改就行了
    -->
    <van-tabbar v-model="selectedIndex" @change="selectedIndexDidChange" active-color="orange" inactive-color="grey"
      :safe-area-inset-bottom="true">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <img class="icon"
            :src="selectedIndex === 2 ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png' : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'">
        </template>
        <div class="text">好友</div>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
  name: "TabBar"
});

const selectedIndex = ref(0);
const selectedIndexDidChange = (newSelectedIndex) => {
  console.log(`点击了标签 ${newSelectedIndex}`);
};
</script>

<style lang="less" scoped>
.tab_bar {

  /*
    方案一：如果我们用了插槽，可以直接自定义它们的样式
    图标的默认大小是22px，我们可以在这里把好友图标的大小改成24px
    文本的默认大小是12px，我们可以在这里把好友文本的大小改成14px
  */
  .icon {
    height: 24px;
  }

  .text {
    font-size: 14px;
  }

  /*
    方案二方式一：精准修改属性的值
    找到图标元素所对应的class=".van-icon"，我们修改它font-size属性的值
    但需要注意的是，我们这里因为给style增加了scoped属性，所以会导致这里的样式只对当前template模板里的元素生效，对外界甚至它的子组件都不生效，所以我们还得用Vue给我们提供的一个语法来让这里的样式对当前组件的子组件也生效，它就是”:deep(选择器)“
  */
  // :deep(.van-icon) {
  //   font-size: 24px;
  // }

  /*
    方案二方式二：局部修改样式变量
    找到图标元素属性所对应的样式变量--van-tabbar-item-icon-size，只在当前class内部修改样式变量的值
    记得使用下!important来确保我们这里样式变量的优先级比默认的那个样式变量高
  */
  // --van-tabbar-item-icon-size: 24px !important;
}
</style>