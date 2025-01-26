// index.js
/*
	首先我们需要知道的是，我们需要把我们小程序里所有网络请求的域名都在小程序后台进行注册，不注册的话是上不了架的，注册的路径是：
	小程序后台 - 开发与服务 - 开发管理 - 开发设置 - 服务器域名
	* 不支持 http，只支持 https，WebSocket 的话是 wss:// 协议
	* 不能是 IP 地址，只能是域名且域名必须经过 ICP 备案

	当然我们在开发阶段，可以先把“不校验域名选项”打开来做开发，等上架的时候再关掉（不管掉的话也是上不了架的），打开的路径是：
	IDE 顶部工具栏 - 详情 - 本地设置 - 不校验合法域名...
*/
import httpRequest from '../../utils/http-request';

Page({
	onLoad() {
		this.fetchMultidata();
		this.updateInfo();
	},

	// Promise 的方式获取请求结果
	fetchMultidata() {
		httpRequest.get({
			url: "http://123.207.32.32:8000/home/multidata",
		}).then(
			(res) => {
				console.log("fetchMultidata 请求成功：", res);
			},
			(err) => {
				console.log("fetchMultidata 请求出错：", err);
			},
		);
	},

	// async、await 的方式获取请求结果
	async updateInfo() {
		try {
			const response = await httpRequest.postJson({
				url: "http://123.207.32.32:1888/02_param/postjson",
				body: {
					"username": "张三",
					"password": "123456",
				},
			});
			console.log("updateInfo 请求成功：", response);
		} catch (error) {
			console.log("updateInfo 请求出错：", error);
		}
	},
})
