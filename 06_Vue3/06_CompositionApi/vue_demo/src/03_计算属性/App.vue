<template>
  <div>
    <Area></Area>
    <SetterGetter></SetterGetter>
  </div>
</template>

<script>
import Area from './计算属性的优势.vue';
import SetterGetter from './计算属性实现类似原生setter、getter的功能.vue'

export default {
  name: "App",
  components: {
    Area,
    SetterGetter,
  },
}
</script>

<style scoped></style>