const _timeout = 30000;
const _responseType = "json";

class HttpRequest {
	get({ url, headers = null, params = null, timeout = _timeout, responseType = _responseType } = {}) {
		return new Promise((resolve, reject) => {
			wx.request({
				method: "GET",
				url: url,
				headers: headers,
				data: params,
				timeout: timeout,
				dataType: responseType,
				success: (res) => resolve(res),
				fail: (err) => reject(err),
			});
		});
	}

	postJson({ url, headers = null, body = null, timeout = _timeout, responseType = _responseType } = {}) {
		return new Promise((resolve, reject) => {
			wx.request({
				method: "POST",
				url: url,
				headers: headers,
				data: body,
				timeout: timeout,
				dataType: responseType,
				success: (res) => resolve(res),
				fail: (err) => reject(err),
			});
		});
	}
}

// 直接导出一个实例，外界导入不用创建实例就能使用了
// 就像axios的做法一样
export default new HttpRequest();