// video/page/video-detail/video-detail.js
import { getMvDetail } from "../../service/video-servcie.js";

Page({
  data: {
    id: 0,
    detail: {},
  },

  onLoad(options) {
    this.setData({
      id: options.id,
    });

    this._getMvDetail();
  },

  // vm
  async _getMvDetail() {
    const data = await getMvDetail(this.data.id);
    this.setData({
      detail: data,
    });
  },
})