import { defineStore } from "pinia";
import { getCityAll } from "../service/city-service";

// 定义store
// 
// 第一个参数：该store的名字，必须是个唯一标识
// 第二个参数：就是state、getters、actions这些东西了
// 
// 但需要注意返回值不直接是一个store，而是一个函数、而这个函数的返回值才是真正的store————在当前文件内有一个this会指向当前store，所以外界在使用时需要调用这个函数来拿到store，外界只要不调用这个函数，那么对应的store就不会被创建，这个CompositionApi里hook函数的设计理念一致
// 我们规范上会把这个函数命名为”useXxx“
const useCityStore = defineStore("useCityStore", {
  // 数据
  state() {
    return {
      data: {},
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 因为pinia里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
    cityGroupTitleList() {
      let cityGroupTitleList = [];
      for (let [_, value] of Object.entries(this.data)) {
        cityGroupTitleList.push(value.title);
      }
      return cityGroupTitleList;
    }
  },
  // 事件（注意：这里既能定义同步方法也能定义异步方法）
  actions: {
    async getCityAll() {
      const response = await getCityAll();
      this.data = response;
    },
  },
});

export default useCityStore;