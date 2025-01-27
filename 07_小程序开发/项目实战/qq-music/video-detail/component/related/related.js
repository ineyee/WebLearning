// video-detail/component/related/related.js
Component({
  properties: {
    detail: {
      type: Object,
      value: {},
    },
  },

  methods: {
    onTapRelatedItem() {
      wx.redirectTo({
        url: `../../../video-detail/page/video-detail/video-detail?id=${this.properties.detail.id}`,
      })
    },
  },
})