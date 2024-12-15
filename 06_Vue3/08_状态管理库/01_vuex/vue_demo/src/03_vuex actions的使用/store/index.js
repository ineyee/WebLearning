// 使用vuex的话，一般都是创建一个store文件夹，然后里面再创建一个index.js

// 导入创建store的函数
import { createStore } from "vuex";

// 创建store
const store = createStore({
  // 数据
  // 相当于OptionApi里data的那部分，连写法都一样
  // 相当于CompositionApi里直接定义属性的那部分
  state() {
    return {
      counter: 0,
    };
  },
  // 同步事件（注意：这里只能定义同步方法）
  // 相当于OptionApi里methods的那部分，连写法都一样
  // 相当于CompositionApi里直接定义方法的那部分
  mutations: {
    // 每个函数第一个参数都是一个state参数，就是上面的state
    // 第二个参数就是我们自己想传递的其它参数了
    add(state, customParam) {
      // mutations里可以直接修改state
      state.counter++;
      console.log(`mutations自定义参数：${customParam}`);
    },
    changeCounter(state, serverCounter) {
      state.counter = serverCounter;
    },
  },
  // 异步事件（注意：这里最好只定义异步方法，当然定义同步方法也不会出错）
  // 相当于OptionApi里methods的那部分，连写法都一样
  // 相当于CompositionApi里直接定义方法的那部分
  actions: {
    // 每个函数第一个参数都是一个context参数，context是一个跟全局单例store拥有相同属性和方法的对象，但是它并不是store
    fetchCounter(context, customParam) {
      // 这里我们用延时来模拟网络请求这个异步操作
      setTimeout(() => {
        // actions里依然只能通过commit mutation的方式来修改state
        context.commit("changeCounter", 100);
        console.log(`actions自定义参数：${customParam}`);
      }, 2000);
    }
  }
});

// 默认导出store
// 因为这个store是一个全局单例，所以一定是在createApp的地方来统一注册一下这个store，别忘了注册
export default store;