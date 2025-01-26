import { getTopMv } from '../../service/video-servcie';

Page({
  data: {
    topMvList: [],
  },

  onLoad() {
    this._getTopMv();
  },

  // 应该抽取到 vm 里的
  async _getTopMv() {
    const data = await getTopMv(20, 0);
    this.setData({
      topMvList: data,
    });
  },
})

