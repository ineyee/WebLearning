import { getBanner, getSongList } from "../../service/music-service";

Page({
  data: {
    bannerList: [],
    hotSongList: [],
  },

  onLoad() {
    this._getBanner();
    this._getHotSongList();
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
  },

  async _getHotSongList() {
    const data = await getSongList(3778678);
    this.setData({
      hotSongList: data,
    });
  },
})