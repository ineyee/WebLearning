// 01_常用组件/pages/07-scroll-view/07-scroll-view.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		colors: ["red", "orange", "yellow", "green", "cyan", "blue", "purple"],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	onScrollToUpper() {
		console.log("滚动到顶部/左边时触发");
	},

	onScrollToLower() {
		console.log("滚动到底部/右边时触发");
	},

	onScroll(e) {
		console.log("滚动过程中触发", e);
	},
})