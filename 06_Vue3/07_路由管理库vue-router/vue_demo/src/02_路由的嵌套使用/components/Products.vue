<template>
  <div>
    <div class="products_navi">
      <div class="products_navi_item" @click="onClick(0)">HearingAids</div>
      <div class="products_navi_item" @click="onClick(1)">MemPod</div>
      <div class="products_navi_item" @click="onClick(2)">Frame</div>
    </div>
    <!-- 3、使用RouterView元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在RouterView元素的位置 -->
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineOptions({
  name: "Products",
});

const router = useRouter();
const onClick = (type) => {
  // 4、使用vue-router提供的router对象来切换路由，子路由得写全路径
  switch (type) {
    case 0:
      router.push("/products/hearingAids");
      break;
    case 1:
      router.push("/products/memPod");
      break;
    case 2:
      router.push("/products/frame");
      break;
    default:
      break;
  }
};
</script>

<style lang="less" scoped>
.products_navi {
  display: flex;
  justify-content: space-between;
}

.products_navi_item {
  cursor: pointer;
}
</style>