// music/component/section-header/section-header.js
Component({
  properties: {
    title: {
      type: String,
      value: "",
    },

    showMore: {
      type: Boolean,
      value: true,
    }
  },

  methods: {
    onTapMore() {
      console.log("onTapMore", this.properties.title);
    },
  },
})