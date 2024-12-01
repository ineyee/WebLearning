<template>
  <div>
    <OptionsApi></OptionsApi>
    <CompositionApi1></CompositionApi1>
    <CompositionApi2></CompositionApi2>
  </div>
</template>

<script>
import OptionsApi from './OptionsApi.vue';
import CompositionApi1 from './CompositionApi1.vue';
import CompositionApi2 from './CompositionApi2.vue';

export default {
  name: "App",
  components: {
    OptionsApi,
    CompositionApi1,
    CompositionApi2,
  },
}
</script>

<style scoped></style>