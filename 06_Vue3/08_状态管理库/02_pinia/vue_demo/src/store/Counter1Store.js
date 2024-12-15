// 导入定义store的函数
// 用defineStore定义的store会被自动关联到全局单例pinia上被管理，我们不需要主动去关联
import { defineStore } from "pinia";

// 定义store
// 
// 第一个参数：该store的名字，必须是个唯一标识
// 第二个参数：就是state、getters、actions这些东西了
// 
// 但需要注意返回值不直接是一个store，而是一个函数、而这个函数的返回值才是真正的store————在当前文件内有一个this会指向当前store，所以外界在使用时需要调用这个函数来拿到store，外界只要不调用这个函数，那么对应的store就不会被创建，这个CompositionApi里hook函数的设计理念一致
// 我们规范上会把这个函数命名为”useXxx“
const useCounter1Store = defineStore("Counter1Store", {
  // 数据
  // 相当于OptionApi里data的那部分
  // 相当于CompositionApi里直接定义属性的那部分
  state() {
    return {
      counter: 0,
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 相当于OptionApi里computed属性的那部分
  // 相当于CompositionApi里computed函数的那部分
  // 
  // 因为pinia里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
    // store里的计算属性只有getter，没有setter，名字都叫getters了，要写setter的话就放到actions里搞成函数吧
    // 只有getter时，可以使用语法糖写法
    // 相当于是在getters里定义了一个方法
    // 
    // 如果想在一个getter方法里用其他getter方法，那就用this，this指向当前store对象，直接使用，不需要.getters
    doubleCounter() {
      return this.counter * 2 * this.testGetter;
    },

    testGetter() {
      return 1;
    },
  },
  // 事件（注意：这里既能定义同步方法也能定义异步方法）
  // 相当于OptionApi里methods的那部分
  // 相当于CompositionApi里直接定义方法的那部分
  actions: {
    fetchCounter() {
      // 这里我们用延时来模拟网络请求这个异步操作
      setTimeout(() => {
        // actions里也是直接修改state，也是通过this，直接修改，不需要.state
        this.counter = 100;
      }, 2000);
    }
  },
});


// 默认导出useCounter1Store
export default useCounter1Store;