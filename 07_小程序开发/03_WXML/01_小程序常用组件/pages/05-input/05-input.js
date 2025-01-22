// 01_常用组件/pages/05-input/05-input.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		account: "1234567890@qq.com",
		nickname: "",
		password: "",
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

	onNickNameReviewed(e) {
		console.log(e);
		if (e.detail.pass) {
			console.log("昵称校验通过");
		} else {
			console.log("昵称校验失败");
		}
	},

	onChanged(e) {
		console.log(`输入改变中：${e.detail.value}`);
	},

	onConfirm() {
		console.log(`输入完成：${this.data.account} ${this.data.nickname} ${this.data.password}`);
	},
})