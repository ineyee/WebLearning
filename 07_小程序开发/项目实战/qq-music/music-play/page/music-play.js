// music-play/page/music-play.js
import { getSongDetail, getLyric} from "../service/music-play-servcie.js";

Page({
  data: {
    id: 0,
    songDetail: {},
    lyric: {},
  },

  onLoad(options) {
    this._getSongDetail(options.id);
    this._getLyric(options.id);
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