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
      console.log(111);
      wx.redirectTo({
        url: `../../../video-detail/page/video-detail/video-detail?id=${this.properties.detail.id}`,
      })
    },
  },
})