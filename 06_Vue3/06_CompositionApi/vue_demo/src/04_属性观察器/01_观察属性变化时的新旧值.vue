<template>
  <div>
    <button @click="click">按钮</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "Watch",
  setup() {
    const message = ref("Hello Vue");
    const click = () => {
      message.value = "Hello Vue3";
    };

    // 属性观察器只能用在存储属性身上
    watch(message, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

    return {
      click,
    };
  },
}
</script>

<style scoped></style>