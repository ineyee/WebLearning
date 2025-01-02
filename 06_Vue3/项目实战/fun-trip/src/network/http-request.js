// 实际开发中我们很少直接使用axios实例，这里仅仅是演示用
// 我们一般都是axios.create()创建自己的axios实例来用
import useCommonStore from "@/store/common-store";
import axios from "axios";

const _commonStore = useCommonStore();

const _timeout = 30000;
const _responseType = "json";

// 每个请求自己的timeout和responseType不会影响这里全局默认的timeout和responseType，只会设置那一次请求自己的
axios.defaults.timeout = _timeout; // axios不支持分别设置连接超时时长、发送超时时长和响应超时时长，它的timeout表示从请求开始到响应结束的总超时时间（单位：毫秒）
axios.defaults.responseType = _responseType; // 默认响应体都是采用JSON返回

// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    _commonStore.showLoading();

    // 在请求发送之前进行处理
    console.log(`\n`);
    console.log(`====================== 请求数据 ======================`);
    console.log(`method = ${config.method}`);
    console.log(`url = ${config.url}`);
    console.log(`headers = ${config.headers}`);
    console.log(`params = ${config.params}`);
    console.log(`body = ${config.data}`);
    console.log(`timeout = ${config.timeout}`);
    console.log(`responseType = ${config.responseType}`);
    console.log(`\n`);
    return config; // 必须返回config
  },
  (error) => {
    _commonStore.hideLoading();

    // 请求出错时的处理
    console.log(`\n`);
    console.log(`====================== 请求出错 ======================`);
    console.log(`error = ${error}`);
    console.log(`\n`);
    return Promise.reject(error);
  }
);

// 设置响应拦截器
axios.interceptors.response.use(
  (response) => {
    _commonStore.hideLoading();

    // 对响应数据进行处理
    console.log(`\n`);
    console.log(`====================== 响应数据 ======================`);
    console.log(`url = ${response.config.url}`);
    console.log(`status = ${response.status}`);
    console.log(`headers = ${response.headers}`);
    console.log(`data = ${response.data}`);
    console.log(`\n`);
    return response.data; // 返回响应数据，axios会自动包裹一层、response.data才是我们服务器真正返回的数据，我们可以在这里统一拦截处理后返回
  },
  (error) => {
    _commonStore.hideLoading();

    // 响应出错时的处理
    console.log(`\n`);
    console.log(`====================== 响应出错 ======================`);
    console.log(`error = ${error}`);
    console.log(`\n`);
    return Promise.reject(error);
  }
);

class HttpRequest {
  get({ url, headers = null, params = null, timeout = _timeout, responseType = _responseType } = {}) {
    return axios.get(url, {
      headers: headers,
      params: params,
      timeout: timeout,
      responseType: responseType,
    });
  }

  postJson({ url, headers = null, params = null, body = null, timeout = _timeout, responseType = _responseType } = {}) {
    return axios.post(url, {
      headers: headers,
      params: params,
      data: body,
      timeout: timeout,
      responseType: responseType,
    });
  }
}

// 直接导出一个实例，外界导入不用创建实例就能使用了
// 就像axios的做法一样
export default new HttpRequest();