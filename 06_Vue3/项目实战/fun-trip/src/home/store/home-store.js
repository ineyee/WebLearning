import { defineStore } from "pinia";
import { getCategories, getHotSuggests } from "../service/home-service";

// 定义store
// 
// 第一个参数：该store的名字，必须是个唯一标识
// 第二个参数：就是state、getters、actions这些东西了
// 
// 但需要注意返回值不直接是一个store，而是一个函数、而这个函数的返回值才是真正的store————在当前文件内有一个this会指向当前store，所以外界在使用时需要调用这个函数来拿到store，外界只要不调用这个函数，那么对应的store就不会被创建，这个CompositionApi里hook函数的设计理念一致
// 我们规范上会把这个函数命名为”useXxx“
const useHomeStore = defineStore("useHomeStore", {
  // 数据
  // 注意：因为我们已经给hotSuggestsList赋了默认值[]，所以在对hotSuggestsList本身做任何操作时都不会报错，但是在对hotSuggestsList的属性做操作时一定要判空，因为那些界面在第一次使用那些数据时网络请求还没请求到，所以会访问到null或undefined而报错，因此要么直接if判断判空，要么?.可选解包访问
  state() {
    return {
      // 入住时间
      beginDateString: "",
      // 离店时间
      endDateString: "",
      // 热门推荐列表数据
      hotSuggestsList: [],
      // 分类列表数据
      categories: [],
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 因为pinia里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
  },
  // 事件（注意：这里既能定义同步方法也能定义异步方法）
  actions: {
    async getHotSuggests() {
      const data = await getHotSuggests();
      this.hotSuggestsList = data;
    },
    async getCategories() {
      const data = await getCategories();
      this.categories = data;
    },
  },
});

export default useHomeStore;