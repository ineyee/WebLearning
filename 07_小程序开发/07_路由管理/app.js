// app.js
App({
	onLaunch() {
		// 登录
		if (wx.getStorageSync("token") !== null && wx.getStorageSync("token") !== undefined) {
			// 可以走个接口判断一下当前 token 是否过期
			// 过期了就重新登录
			// 没过期就自动登录，走正常业务...
		} else {
			// 未登录，登录
			wx.login({
				success: res => {
					console.log("登录 code：", res.code);

					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					wx.request({
						method: "POST",
						url: 'https://123.207.32.32:3000/login',
						data: {
							code: res.code,
						},
						success: (res) => {
							console.log("换取成功：", res);

							// 本地存储一下
							wx.setStorageSync("token", res.data.token);
						},
					});
				},
			})
		}
	},
})
