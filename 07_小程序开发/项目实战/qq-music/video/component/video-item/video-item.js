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
      console.log(111);
      wx.navigateTo({
        url: `../../page/video-detail/video-detail?id=${this.properties.video.id}`,
      });
    },
  },
})