// 02_小程序组件语法/pages/04_bind/04_bind.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

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

	button1Click() {
		console.log("点击了按钮一");
	},
	button2Click() {
		console.log("点击了按钮二");
	},
	button2MouseOver() {
		console.log("按下了按钮二");
	},
	button2MouseOut() {
		console.log("抬起了按钮二");
	},
	button3Click(event) {
		console.log("点击了按钮三", event);
	},
	button4Click(event) {
		console.log("点击了按钮四", event.currentTarget.dataset, event.mark);
	},
})