<template>
  <div class="house-map-component">
    <HouseSectionComponent header-text="位置周边" footer-text="查看更多周边信息">
      <template #content>
        <div class="map" ref="_mapRef">
        </div>
      </template>
    </HouseSectionComponent>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HouseSectionComponent from './house-section-component.vue';

defineOptions({
  name: "house-map-component"
});

const _props = defineProps({
  curHousePosition: {
    type: Object,
    default() {
      return {};
    },
  },
});

const _mapRef = ref();
onMounted(() => {
  // 不能放在setup里做，因为BMapGL.Map(xxx)是把百度地图渲染到某个HTML元素内，所以必须得等这个HTML元素挂载后再做这件事
  const map = new BMapGL.Map(_mapRef.value); // 创建地图实例
  const point = new BMapGL.Point(_props.curHousePosition.longitude, _props.curHousePosition.latitude); // 创建点坐标
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别

  var marker = new BMapGL.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
});
</script>

<style lang="less" scoped>
.map {
  height: 240px;
}
</style>