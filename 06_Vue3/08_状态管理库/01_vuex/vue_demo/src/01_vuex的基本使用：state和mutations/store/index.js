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
      state.counter++;
      console.log(`自定义参数：${customParam}`);
    },
  },
});

// 默认导出store
// 因为这个store是一个全局单例，所以一定是在createApp的地方来统一注册一下这个store，别忘了注册
export default store;