// index.js
Page({
	// 数据
	// 跟Vue里的OptionsApi非常像
	data: {
		counter: 0,
	},

	// 事件
	// 跟Vue里的OptionsApi非常像
	add() {
		const newCounter = this.data.counter += 1;
		this.setData({
			counter: newCounter, 
		});
	},
})