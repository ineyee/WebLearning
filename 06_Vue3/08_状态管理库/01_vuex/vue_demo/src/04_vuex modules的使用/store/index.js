// 使用vuex的话，一般都是创建一个store文件夹，然后里面再创建一个index.js

// 导入创建store的函数
import { createStore } from "vuex";

// 导入子模块
import Counter1Module from "./Counter1Module";
import Counter2Module from "./Counter2Module";

// 创建store
const store = createStore({
  // 把所有的子模块都放在全局单例store的modules属性里就可以了，这样全局单例store就不会过于臃肿了
  modules: {
    Counter1Module,
    Counter2Module,
  },
});

// 默认导出store
// 因为这个store是一个全局单例，所以一定是在createApp的地方来统一注册一下这个store，别忘了注册
export default store;