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
      width: 100,
      height: 100,
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 相当于OptionApi里computed属性的那部分，连写法都一样
  // 相当于CompositionApi里computed函数的那部分
  // 
  // 因为vuex里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
    // store里的计算属性只有getter，没有setter，名字都叫getters了，要写setter的话就放到mutations里搞成函数吧
    // 只有getter时，可以使用语法糖写法
    // 相当于是在getters里定义了一个方法
    area(state) {
      return state.width * state.height;
    },

    // 第一个参数是state，就是上面的state
    // 第二个参数是getters，就是所有的getters，我们可以在一个getter方法里用其他getter方法
    fulldisplay(state, getters) {
      return `圆的面积：${getters.area}`;
    },
  },
  // 同步事件（注意：这里只能定义同步方法）
  // 相当于OptionApi里methods的那部分，连写法都一样
  // 相当于CompositionApi里直接定义方法的那部分
  mutations: {
    // 每个函数第一个参数都是一个state参数，就是上面的state
    // 第二个参数就是我们自己想传递的其它参数了
    changeWidth(state, width) {
      state.width = width;
      state.height = width;
    },
  },
});

// 默认导出store
// 因为这个store是一个全局单例，所以一定是在createApp的地方来统一注册一下这个store，别忘了注册
export default store;