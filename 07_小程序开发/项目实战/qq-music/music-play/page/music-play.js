// music-play/page/music-play.js
import { getSongDetail, getLyric } from "../service/music-play-servcie.js";

Page({
  data: {
    statusBarHeight: 44,

    id: 0,
    songDetail: {},
    lyric: {},
    selectedIndex: 0, // 0-歌曲，1-歌词
  },

  onLoad(options) {
    const app = getApp();
    this.setData({
      statusBarHeight: app.globalData.safeAreaHeightTop,
    });

    this._getSongDetail(options.id);
    this._getLyric(options.id);
  },

  onTapBack() {
    wx.navigateBack();
  },

  onTapSong() {
    if (this.data.selectedIndex === 0) {
      return;
    }

    this.setData({
      selectedIndex: 0,
    });
  },

  onTapLyric() {
    if (this.data.selectedIndex === 1) {
      return;
    }

    this.setData({
      selectedIndex: 1,
    });
  },

  // vm
  async _getSongDetail(id) {
    const data = await getSongDetail(id);
    this.setData({
      songDetail: data,
    });
  },

  async _getLyric(id) {
    const data = await getLyric(id);
    this.setData({
      lyric: data.lyric,
    });
  },
})