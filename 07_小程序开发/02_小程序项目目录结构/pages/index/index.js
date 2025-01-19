// index.js
/*
  当前界面的逻辑文件，每个界面都必须在对应的.js文件中调用Page构造方法创建一个界面实例，Page构造方法接收一个对象作为参数
*/
Page({
  // 界面的属性/状态
  data: {
    _counter: 0,
    text: "This is page data.",
  },

  // 界面的方法
  _fetchData() {
    console.log("请求数据");
  },

  onButtonClick() {
    console.log("点击了按钮");
  },

  /*
    界面生命周期函数——界面加载完成，只会触发一次
    类似于iOS里的viewDidLoad、Flutter里的onInitState、Vue CompositionApi里的setup
  */
  onLoad() {
    console.log("界面加载完成");
  },

  /*
    界面生命周期函数——界面初次渲染完成，只会触发一次
    类似于Flutter里的addPostFrameCallback、Vue CompositionApi里的onMounted
  */
  onReady() {
    console.log("界面初次渲染完成");
  },

  /*
    界面生命周期函数——界面销毁，只会触发一次
    类似于iOS里的dealloc、Flutter里的onDispose、Vue CompositionApi里的onUnmounted
  */
  onUnload() {
    console.log("界面销毁");
  },

  /*
    界面生命周期函数——界面显示，会触发多次
    类似于iOS里的viewDidAppear
  */
  onShow() {
    console.log("界面显示");
  },

  /*
    界面生命周期函数——界面隐藏，会触发多次
    类似于iOS里的viewDidDisappear
  */
  onHide() {
    console.log("界面隐藏");
  },

  /*
    界面监听函数——下拉刷新函数
  */
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
  },
  /*
    界面监听函数——上拉加载函数
  */
  onReachBottom() {
    console.log("onReachBottom");
  },

  onPageScroll(event) {
    console.log("onPageScroll", event);
  },
})
