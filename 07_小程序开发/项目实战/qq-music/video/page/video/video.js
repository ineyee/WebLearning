import { getTopMv } from '../../service/video-servcie';

Page({
  data: {
    topMvList: [],
  },

  onLoad() {
    this._getTopMv();
  },

  onPullDownRefresh() {
    console.log("下拉刷新");
    this._refreshTopMv();
  },

  onReachBottom() {
    console.log("滚动到底部了");
    this._loadMoreTopMv();
  },

  // 应该抽取到 vm 里的
  async _getTopMv() {
    const data = await getTopMv(20, 0);
    // 第一次请求无论成功与失败，都设置一下
    this.setData({
      topMvList: data,
    });
  },

  async _refreshTopMv() {
    const data = await getTopMv(20, 0);
    wx.stopPullDownRefresh();
    if (data.length !== 0) {
      // 请求成功再刷新
      this.setData({
        topMvList: data,
      });
    }
  },

  async _loadMoreTopMv() {
    const data = await getTopMv(20, this.data.topMvList.length);
    if (data.length !== 0) {
      // 请求成功再刷新
      this.setData({
        topMvList: [...this.data.topMvList, ...data],
      });
    }
  },
})

