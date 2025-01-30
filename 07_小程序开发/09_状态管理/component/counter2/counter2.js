// component/counter2/counter2.js
// 导入 store
import useCounterStore from "../../store/counter-store.js";

Component({
  /*
    因为 wxml 里只能直接使用对应 .js 文件里的数据，而不能直接使用其它地方的数据
    所以组件里还是需要定义跟 store 里同名的数据的，来接收来自 store 里共享的数据供 wxml 使用

    可见小程序里的 store 真就是个数据和方法的中转站，纯粹是为了能够共享数据，如果数据和方法是独享而不需要共享的话，那直接写在组件里要比使用状态管理简单多了，导致复杂的主要原因就是 wxml 只能直接使用 .js 里文件里的东西
  */
  data: {
    counter: 0,
  },

  methods: {
    /*
      因为 wxml 里只能直接调用对应 .js 文件里的方法，而不能直接调用其它地方的方法
      所以组件里还是需要定义跟 store 里同名的方法的，来调用 store 里的方法修改共享的数据。与此同时，我们在这里也无法直接修改 store 里共享的数据、主要是修改后不会触发监听，所以得调用状态管理库里的方法来修改 store 里共享的数据、内部修改后会触发监听

      可见小程序里的 store 真就是个数据和方法的中转站，纯粹是为了能够共享数据，如果数据和方法是独享而不需要共享的话，那直接写在组件里要比使用状态管理简单多了，导致复杂的主要原因就是 wxml 只能直接使用 .js 里文件里的东西
    */
    multi() {
      useCounterStore.dispatch("multi");
    },

    /*
      因为要取消监听，所以为了保证监听和取消监听的回调是同一个函数
      我们得为组件接收来自 store 共享的数据创建一个回调函数
    */
    counterCallback(value) {
      console.log("couter2 监听 counter:", value)

      this.setData({
        counter: value,
      });
    },
  },

  lifetimes: {
    attached() {
      console.log("counter2 创建");
      /*
        那组件里的数据是如何接收来自 store 共享的数据的呢？
        通过监听，这个监听会返回数据的初始值，后续数据变化也会触发
        记得取消监听

        你可能会问为什么要通过监听的方式来获取 store 共享的数据的呢？
        主要就是因为状态管理库的主要用途就是数据共享，在自己内部修改来数据我们当然知道什么时候 setData 来刷新界面了，但是别的地方修改了共享的数据，这里怎么知道要刷新界面呢？所以只能通过监听来搞
      */
      useCounterStore.onState("counter", this.counterCallback.bind(this));
    },
    detached() {
      console.log("counter2 销毁");
      /*
        记得取消监听
      */
      useCounterStore.offState("counter", this.counterCallback.bind(this));
    },
  },
})