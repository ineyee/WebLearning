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
import { getSongList } from "../service/music-service";

// 定义 store
// 
// 我们把 data=>state 和 methods=>actions 都放到 store 里来
// 
// 返回值直接是一个 store，所以外界在使用时导入后就能直接使用了
// 我们规范上会把这个 store 命名为”useXxxStore“
const useSongListStore = new HYEventStore({
  // 数据：data 那部分
  // 
  // 定义这部分的原因，当然就是因为这部分数据需要共享，所以这部分是必须的
  state: {
    hotSongList: [],
  },

  // 事件：methods 那部分
  // 注意：这里既能定义同步方法也能定义异步方法
  // 
  // 定义这部分的原因，主要是为了在数据发生变化时触发监听，以便共享上面数据的所有视图层都能知道数据发生变化了，否则就纯粹是共享了数据的使用，但是数据改变后使用数据的地方大家都不知道要改变数据甚至刷新界面，这是不行的，所以这部分也是必须的
  actions: {
    // Api 设计上我们不能通过 this 来访问 state
    // 而是给我们提供了一个 ctx 来访问 state，类似于 this 的作用
    async getHotSongList(ctx) {
      const data = await getSongList(3778678);
      ctx.hotSongList = data;
    },
  },
});

// 默认导出 useSongListStore
export default useSongListStore;

/*
  第三步：使用状态管理库
  详见 music 界面
*/
