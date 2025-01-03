module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // UI给到我们的设计稿都是基于375 x xxx的，这是我们做适配的一个前提，不同的前提对应不同的配置，此处我们假定前提就是375 x xxx
      viewportWidth: 375,
    },
  },
};