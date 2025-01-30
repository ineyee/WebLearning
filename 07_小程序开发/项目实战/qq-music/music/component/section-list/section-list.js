// music/component/section-list/section-list.js
Component({
  properties: {
    showTopTen: {
      type: Boolean,
      value: true,
    },

    songList: {
      type: Array,
      value: [],
    }
  },
})