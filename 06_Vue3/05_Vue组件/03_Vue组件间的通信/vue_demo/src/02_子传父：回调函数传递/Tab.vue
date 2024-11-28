<template>
  <button @click="onClick('摘要')">摘要</button>
  <button @click="onClick('转写')">转写</button>
  <button @click="onClick('评论')">评论</button>
</template>

<script>
export default {
  name: "Tab",

  // props和methods里的函数名最好不要重名，否则会报“重复定义”的警告
  props: {
    onTap: {
      type: Function,
      default: null,
    },
  },
  methods: {
    onClick(type) {
      if (this.onTap !== null) {
        this.onTap(type);
      }
    },
  },
}
</script>

<style></style>