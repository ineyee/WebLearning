// pages/01_WXS 是干啥用的/01_WXS 是干啥用的.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		books: [
			{ id: 1, name: "语文", price: 111 },
			{ id: 2, name: "数学", price: 222 },
			{ id: 3, name: "英语", price: 333 },
		],
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

	getHandledPrice(price) {
		return `￥${price}`;
	},

	getTotalPrice() {
		let totalPrice = 0;
		for (let index = 0; index < books.length; index++) {
			const element = books[index];
			totalPrice += element.price;
		}
		return totalPrice;
	},
})