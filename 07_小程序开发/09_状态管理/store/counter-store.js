/*
  第一步：安装状态管理库
  cd 到项目根目录，执行”npm install hy-event-store“安装状态管理库
  安装完成后，构建一下 npm
*/

/*
  第二步：定义状态管理库
*/
// 导入 HYEventStore 类
import { HYEventStore } from "hy-event-store";

// 定义 store
// 
// 我们把 data=>state 和 methods=>actions 都放到 store 里来
// 
// 返回值直接是一个 store，所以外界在使用时导入后就能直接使用了
// 我们规范上会把这个 store 命名为”useXxxStore“
const useCounterStore = new HYEventStore({
  // 数据：data 那部分
  state: {
    counter: 0,
  },

  // 事件：methods 那部分
  // 注意：这里既能定义同步方法也能定义异步方法
  actions: {
    // Api 设计上我们不能通过 this 来访问 state
    // 而是给我们提供了一个 ctx 来访问 state，类似于 this 的作用
    add(ctx) {
      ctx.counter++;
    },

    multi(ctx) {
      ctx.counter *= 2;
    },
  },
});

// 默认导出 useCounterStore
export default useCounterStore;

/*
  第三步：使用状态管理库
  详见 counter1 组件和 counter2 组件里
*/
