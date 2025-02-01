// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 812,
    // 顶部安全区域高度，包含状态栏高度
    safeAreaHeightTop: 44,
    appBarHeight: 44,
    navigationBarHeight: 44 + 44,
    // 底部安全区域高度
    safeAreaHeightBottom: 34,
  },

  onLaunch() {
    const windowInfo = wx.getWindowInfo();
    this.globalData.screenWidth = windowInfo.screenWidth;
    this.globalData.screenHeight = windowInfo.screenHeight;
    this.globalData.safeAreaHeightTop = windowInfo.safeArea.top;
    this.globalData.navigationBarHeight = this.globalData.safeAreaHeightTop + this.globalData.appBarHeight;
    this.globalData.safeAreaHeightBottom = this.globalData.screenHeight - windowInfo.safeArea.bottom;
  },
})
