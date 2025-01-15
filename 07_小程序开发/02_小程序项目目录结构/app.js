// app.js
/*
	我们小程序项目的入口文件，每个小程序项目都必须在app.js中调用App构造方法创建一个小程序实例，App构造方法接收一个对象作为参数

	整个小程序只有这么一个App实例，是所有界面共享的。开发者可以在任意位置直接调用全局函数getApp()获取到这个全局唯一的App实例，进而获取开发者注册在App上的数据变量或者调用开发者注册在App上的函数
*/
App({
	/*
		App生命周期函数——小程序初始化完成并启动，只会触发一次
		类似于iOS里的application:didFinishLaunchingWithOptions:

		这里的启动特别指小程序的冷启动，即小程序被杀掉后用户重新打开该小程序
	*/
	onLaunch(options) {
		console.log("小程序初始化完成并启动");
	},

	/*
		App生命周期函数——小程序进入前台，会触发多次
		类似于iOS里的applicationWillEnterForeground:

		小程序冷启动后，界面被展示给用户，此时小程序处于「前台」状态
		或者小程序原本处于「后台」状态，用户又打开了该小程序，界面被展示给用户，此时小程序也处于「前台」状态
	*/
	onShow(options) {
		console.log("小程序进入前台");
		_checkEnterScene(options);
	},

	/*
		App生命周期函数——小程序进入后台，会触发多次
		类似于iOS里的applicationDidEnterBackground:

		当用户「关闭」小程序时，小程序并没有真正被关闭，而是进入了「后台」状态，此时小程序还可以短暂运行一小段时间，但部分API的使用会受到限制。切后台的方式包括但不限于以下几种：
		* 小程序前台运行时直接把微信切后台（手势或Home键）
		* 小程序前台运行时直接锁屏
		* 点击右上角胶囊按钮离开小程序
		* iOS从屏幕左侧右滑离开小程序
		* 安卓点击返回键离开小程序

		小程序进入后台30分钟后如果还没再次进入前台，小程序会被杀掉
	*/
	onHide() {
		console.log("小程序进入后台");
	},

	/*
		自定义数据变量和函数

		因为App实例全局只有一个，是所有界面共享的，所以开发者可以添加任意的数据变量和函数到Object参数中来进行全局共享，用App实例就可以访问到
		当然这些共享的数据变量和函数不是类似vuex、pinia那种级别复杂的共享，而仅仅是类似我们手动创建了一个单例对象那种级别的共享，所以只适合做一些简单东西的共享
	*/
	globalData: {
		token: "872987987128",
		userInfo: {
			name: "张三",
			password: "123456",
		},
	},

	getToken() {
		return this.globalData.token;
	},
})

// 判断是通过什么方式进入得小程序
function _checkEnterScene(params) {
	switch (params.scene) {
		case 1001:
			console.log("微信首页下拉出来的小程序列表或者发现页点进去的小程序列表，从那里点击进入小程序");
			break;
		case 1005:
			console.log("微信首页搜索出来小程序，从那里点击进入小程序");
			break;
		case 1006:
			console.log("发现页点进去搜索出来小程序，从那里点击进入小程序");
			break;
		case 1007:
			console.log("单人聊天会话中的小程序消息卡片，从那里点击进入小程序");
			break;
		case 1008:
			console.log("群聊会话中的小程序消息卡片，从那里点击进入小程序");
			break;
		case 1010:
			console.log("收藏夹，从那里点击进入小程序");
			break;
		case 1011:
			console.log("扫描小程序二维码进入小程序");
			break;
		case 1012:
			console.log("长按小程序二维码识别进入小程序");
			break;
		case 1013:
			console.log("扫描手机相册中的小程序二维码进入小程序");
			break;
		default:
			console.log("其它方式进入小程序");
			break;
	}
}