<template>
  <div class="city-component" @click="onClick">
    <div class="city">{{ cityStore.selectedCity.cityName }}</div>
    <div class="position">
      <div class="my-position">我的位置</div>
      <img class="position-icon" src="../../asset/image/icon_location.png" alt="">
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useCityStore from '../store/city-store';

defineOptions({
  name: "city-component"
});

const router = useRouter();
const onClick = () => {
  router.push("/cityPage");
};

const cityStore = useCityStore();
</script>

<style lang="less" scoped>
.city-component {
  padding: 10px 20px 10px 20px;

  display: flex;
  justify-content: space-between;

  .position {
    display: flex;
    align-items: center;

    .position-icon {
      width: 18px;
      height: 18px;
      padding-left: 10px;
    }
  }
}
</style>