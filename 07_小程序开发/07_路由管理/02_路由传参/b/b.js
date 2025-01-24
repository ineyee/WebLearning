// 01_路由的基本使用/b/b.js
Page({
	/*
		子界面 onLoad 函数的 options 参数就是父界面传递过来的参数
		对那些不想被解析为字符串的数据进行解码
	*/
	onLoad(options) {
		const age = JSON.parse(decodeURIComponent(options.age));
		const height = JSON.parse(decodeURIComponent(options.height));
		const friends = JSON.parse(decodeURIComponent(options.friends));
		const job = JSON.parse(decodeURIComponent(options.job));

		console.log('Name:', options.name);
		console.log('Age:', age);
		console.log('Height:', height);
		console.log('Friends:', friends);
		console.log('Job:', job);
	},

	// 无论点击导航栏的返回按钮还是我们自定义的返回按钮
	// 界面销毁时都会触发这个回调，我们在这个回调里把数据传回去
	onUnload() {
		// 获取到 eventChannel
		const eventChannel = this.getOpenerEventChannel();
		// 发出事件、传递参数
		eventChannel.emit("back", {
			name: "李四",
			age: 19,
			height: 1.99,
		});
	},

	back() {
		wx.navigateBack();
	},
})