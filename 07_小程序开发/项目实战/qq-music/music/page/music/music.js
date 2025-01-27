import { getBanner } from "../../service/music-service";

Page({
  data: {
    bannerList: [],
  },

  onLoad() {
    this._getBanner();
  },

  onTapSearch() {
    wx.navigateTo({
      url: "../music-search/music-search",
    })
  },

  // vm
  async _getBanner() {
    const data = await getBanner();
    this.setData({
      bannerList: data,
    });
  }
})