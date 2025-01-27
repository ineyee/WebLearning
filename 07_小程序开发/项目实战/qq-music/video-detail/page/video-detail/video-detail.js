// video/page/video-detail/video-detail.js
import { getMvUrl, getMvDetail } from "../../../video-detail/service/video-detail-servcie.js";

Page({
  data: {
    id: 0,
    url: "",
    detail: {},
  },

  onLoad(options) {
    this.setData({
      id: options.id,
    });

    this._getMvUrl();
    this._getMvDetail();
  },

  // vm
  async _getMvUrl() {
    const data = await getMvUrl(this.data.id);
    this.setData({
      url: data.url,
    });
  },

  async _getMvDetail() {
    const data = await getMvDetail(this.data.id);
    this.setData({
      detail: data,
    });
  }
})