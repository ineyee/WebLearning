// logs.js
const util = require('../../utils/util.js')

Page({
	data: {
		logs: []
	},
	onLoad() {
		this.setData({
			logs: (wx.getStorageSync('logs') || []).map(log => {
				return {
					date: util.formatTime(new Date(log)),
					timeStamp: log
				}
			})
		})
	},

	// 监听下拉刷新
	onPullDownRefresh() {
		console.log("下拉刷新");

		// 模拟网络请求
		setTimeout(() => {
			console.log("消失下拉刷新");
			wx.stopPullDownRefresh();
		}, 10000);
	},

	// 监听界面滚动到底部
	onReachBottom() {
		console.log("界面滚动到底部");
	}
})
