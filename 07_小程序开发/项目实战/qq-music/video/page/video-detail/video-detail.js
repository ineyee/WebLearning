// video/page/video-detail/video-detail.js
Page({
  data: {
    id: 0,
  },

  onLoad(options) {
    this.setData({
      id: options.id,
    });
  },
})