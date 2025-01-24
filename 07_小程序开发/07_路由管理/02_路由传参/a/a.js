// 01_路由的基本使用/a/a.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		name: "张三",
		age: 18,
		height: 1.88,
		friends: [
			{
				name: "kobe",
				age: 41,
				height: 1.98,
			},
			{
				name: "james",
				age: 40,
				height: 2.03,
			},
		],
		job: {
			name: "厨师",
		},
	},

	to() {
		wx.navigateTo({
			/*
				父界面给子界面传参是通过查询字符串来传递的
				而查询字符串传递参数，会导致那些不想被解析为字符串的数据都解析为字符串，所以我们可以进行编码，子界面在接收后再进行解码
			*/
			url: `../b/b?name=${this.data.name}&age=${encodeURIComponent(JSON.stringify(this.data.age))}&height=${encodeURIComponent(JSON.stringify(this.data.height))}&friends=${encodeURIComponent(JSON.stringify(this.data.friends))}&job=${encodeURIComponent(JSON.stringify(this.data.job))}`,
			/*
				父界面接收子界面返回的数据是通过自定义事件来实现的，类似子组件给父组件传参那样
				events 里可以定义任意多个函数，函数名其实就是一个一个的事件，将来子组件就是发出这个事件
			*/
			events: {
				back(args) {
					console.log("来自子界面的参数：", args);
				},
			},
		});
	},
})