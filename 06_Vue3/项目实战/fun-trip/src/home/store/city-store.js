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
  // 注意：因为我们已经给data赋了默认值{}，所以在对data本身做任何操作时都不会报错，但是在对data的属性做操作时一定要判空，因为那些界面在第一次使用那些数据时网络请求还没请求到，所以会访问到null或undefined而报错，因此要么直接if判断判空，要么?.可选解包访问
  state() {
    return {
      // 搜索的内容
      searchedText: "",
      // tab选中的下标
      selectedIndex: 0,
      // 列表数据
      data: {},
      // 选中的城市
      selectedCity: {
        "cityId": 7,
        "cityName": "杭州",
        "pinYin": "hangzhou",
        "gangAoTai": false,
        "hot": false,
        "longitude": "120.162",
        "latitude": "30.279"
      },
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 因为pinia里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
    _cityGroupKeyList() {
      let cityGroupKeyList = Object.keys(this.data);
      return cityGroupKeyList;
    },

    cityGroupTitleList() {
      let cityGroupTitleList = [];
      for (let [_, value] of Object.entries(this.data)) {
        cityGroupTitleList.push(value.title);
      }
      return cityGroupTitleList;
    },

    cityHotList() {
      return this.data[this._cityGroupKeyList[this.selectedIndex]]?.hotCities;
    },

    cityGroupList() {
      // ?.可选解包访问
      // 在Flutter里我们还会保证最后一层cities不为null或undefined，类似于：return this.data[cityGroupTitle]?.cities ?? {};
      // 但在Vue里最后一层似乎不用管，template模板语法好像自动会规避最后一层的判断
      return this.data[this._cityGroupKeyList[this.selectedIndex]]?.cities;
    },

    indexList() {
      let tempList = ["#"];
      tempList.push(...this.data[this._cityGroupKeyList[this.selectedIndex]]?.cities?.map((city) => city.group));
      return tempList;
    },
  },
  // 事件（注意：这里既能定义同步方法也能定义异步方法）
  actions: {
    async getCityAll() {
      const data = await getCityAll();
      this.data = data;
    },
  },
});

export default useCityStore;