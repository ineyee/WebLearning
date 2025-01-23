// 04_小程序组件间的通信/02_子传父：triggerEvent事件传递/component/tab.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(event) {
      // 发出一个自定义事件
      // 第一个参数是自定义事件的名称，父组件可以通过 bind: 来监听，就像我们监听 button 的 tap 事件一样
      // 第二个参数、第三个参数...是自定义事件的参数，这些参数都在父组件 event 事件的 detail 里
      this.triggerEvent("selectTab", event.currentTarget.dataset.type);
    },
  },
})