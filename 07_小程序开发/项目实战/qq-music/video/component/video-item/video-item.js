// video/component/video-item.js
Component({
  properties: {
    video: {
      type: Object,
      value: {},
    }
  },

  methods: {
    onTapVideoItem() {
      wx.navigateTo({
        url: `../../../video-detail/page/video-detail/video-detail?id=${this.properties.video.id}`,
      });
    },
  },
})