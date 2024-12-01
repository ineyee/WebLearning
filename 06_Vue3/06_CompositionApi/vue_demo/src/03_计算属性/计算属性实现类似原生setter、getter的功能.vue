<template>
  <div>
    <button @click="setter">setter</button>
    <button @click="getter">getter</button>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: "SetterGetter",
  setup() {
    const _message = ref("Hello Vue");
    // 计算属性只能用在存储属性身上
    // CompositionApi里的computed计算属性是基于响应式实现的，所以计算属性所依赖的属性必须是响应式的，并且计算属性本身也是响应式的
    let message = computed({
      set(newValue) {
        console.log("setter了message", newValue);
        _message.value = newValue;
      },
      get() {
        console.log("getter了message");
        return _message.value;
      },
    });

    const setter = () => {
      message.value = "Hello Vue3";
    };
    const getter = () => {
      console.log(message.value);
    };

    return {
      setter,
      getter,
    };
  },
};
</script>

<style scoped></style>