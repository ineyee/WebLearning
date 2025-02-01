// music-play/page/music-play.js
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