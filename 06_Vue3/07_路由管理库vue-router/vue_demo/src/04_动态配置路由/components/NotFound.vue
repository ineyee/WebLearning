<template>
  <div class="not_found">
    您访问的路径“{{ $route.params.pathMatch }}”不存在，请检查路径！
  </div>
</template>

<script setup>
defineOptions({
  name: "NotFound"
});
</script>

<style lang="less" scoped>
.not_found {
  color: red,
}
</style>