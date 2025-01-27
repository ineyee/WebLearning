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
      console.log("onTap", this.properties.song.name);
    },
  },
})