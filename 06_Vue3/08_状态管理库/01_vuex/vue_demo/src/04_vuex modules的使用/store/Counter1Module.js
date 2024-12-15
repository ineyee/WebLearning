// 模块其实就是一个对象，有自己单独的state、getters、mutations、action、甚至也可以有自己的子模块

// 创建子模块
const Counter1Module = {
  // 子模块一定要设置自己的命名空间，以免和其它模块里的东西命名重复而出错
  namespaced: true,
  // 数据
  // 相当于OptionApi里data的那部分，连写法都一样
  // 相当于CompositionApi里直接定义属性的那部分
  state() {
    return {
      counter: 0,
    };
  },
  // 计算属性（我们也认为是数据的一部分，因为对外界使用者来说计算属性就是数据）
  // 相当于OptionApi里computed属性的那部分，连写法都一样
  // 相当于CompositionApi里computed函数的那部分
  // 
  // 因为vuex里的存储属性默认都是响应式的，而计算属性又仅仅是使用了存储属性，所以计算属性本身也都是响应式的
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
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
};

// 导出子模块
export default Counter1Module;