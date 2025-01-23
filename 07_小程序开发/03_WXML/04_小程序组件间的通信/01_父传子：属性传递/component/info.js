// 04_小程序组件间的通信/01_父传子：属性传递/component/info.js
Component({
  /**
   * 组件的属性列表
   * 
   * 子组件如何接收参数呢？
   * 
   * 非常简单，properties属性专门就是用来接收父组件传递过来的参数的，用于组件间的通信
   * 类似于 OptionsApi 里的 props、CompositionApi 里的 defineProps
   * 它的value是一个对象（类似于Flutter里Widget构造函数里的参数）
   * 
   * 我们需要指定属性的类型
   * 不过小程序开发里无法指定属性是否必传，不过按照习惯上，如果我们写默认值就视为必传，为了默认值（不管默认值是有效值也好还是 null 也好）就视为不必传
   * 
   * 那常见的类型有哪些呢？
   * 基本数据类型：Boolean、Number、String
   * 对象数据类型：Array、Object
   * 注意：小程序开发里父组件不能给子组件传递函数 Function 作为参数，同样是因为双线程模型
   */
  properties: {
    name: { // 没有默认值，必传
      type: String,
    },
    age: { // 有默认值，不必传
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0.0,
    },
    friends: {
      type: Array,
      value: [],
    },
    job: {
      type: Object,
      value: {},
    },
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

  }
})