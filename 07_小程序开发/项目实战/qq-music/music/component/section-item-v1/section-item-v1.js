// music/component/section-item-v1/section-item-v1.js
Component({
  properties: {
    song: {
      type: Object,
      value: {},
    },
  },

  methods: {
    onTap() {
      wx.navigateTo({
        url: `../../../music-play/page/music-play?id=${this.properties.song.id}`,
      });
    },
  },
})