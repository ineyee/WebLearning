// 02_小程序组件语法/pages/02_wx-if、block 元素、hidden属性/02_wx-if、block 元素、hidden属性.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isPro: false,
		list: [],
		score: 59,
		flag: false,
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

	changePro() {
		this.setData({
			isPro: !this.data.isPro,
		});
	},

	changeList() {
		if (this.data.list.length <= 0) {
			this.setData({
				list: ["假如爱有天意"],
			});
		} else {
			this.setData({
				list: [],
			});
		}
	},

	changeScore() {
		this.setData({
			score: this.data.score + 10,
		});
	},

	changeFlag() {
		this.setData({
			flag: !this.data.flag,
		});
	},
})