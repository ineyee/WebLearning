import { getTopMv } from '../../service/video-servcie';

Page({
  data: {
    topMvList: [],
  },

  // 生命周期函数
  async onLoad() {
    const data = await getTopMv(20, 0);
    this.setData({
      topMvList: data,
    });
  },
})

