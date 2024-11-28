<template>
  <hello-world></hello-world>
  <HelloWorld></HelloWorld>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
}
</script>

<style scoped></style>