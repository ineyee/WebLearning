<template>
  <div class="banner-component">
    <img class="image" src="@/asset/image/banner.webp" alt="">
  </div>
</template>

<script setup>
defineOptions({
  name: "banner-componentName"
});
</script>

<style lang="less" scoped>
.image {
  // img元素是个行内级替换元素
  // 
  // 行内级元素默认情况下，宽度包裹内容、高度包裹内容
  //  * 行内级替换元素可以设置宽高，也就是说对于行内级替换元素来说设置width和height属性是生效的
  //    * 行内级替换元素如：img元素
  //  * 行内级非替换元素不可以设置宽高，也就是说对于行内级非替换元素来说设置width和height属性是不生效的，它们的宽高只能由内容决定——即包裹内容
  //    * 行内级非替换元素如：a元素、span元素
  // 
  // width、height属性的百分比是相对于父视图的width、height属性
  // 只设置其中一个，另一个会根据比例自动适配
  width: 100%;
}
</style>