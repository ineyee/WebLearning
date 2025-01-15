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
		// 不过小程序开发只是声明式的而不是响应式的，需要我们在修改数据后手动触发界面刷新
		this.setData({
			counter: newCounter, 
		});
	},
})