import httpRequest from '../../network/http-request';

// 强调函数式编程，不写类，就像很多 hook 函数也是一样的直接写个函数导出出去了
export async function getMvUrl(id) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/mv/url",
      params: {
        id: id,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/mv/url 请求失败：", response.data["code"]);
      return {};
    } else {
      if (response.data["data"] === null) {
        console.log("/mv/url 请求失败：数据为 null");
        return {};
      } else {
        console.log("/mv/url 请求成功：", response.data["data"]);
        return response.data["data"];
      }
    }
  } catch (error) {
    console.log("/mv/url 请求失败：", error);
    return {};
  }
};

export async function getMvDetail(id) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/mv/detail",
      params: {
        mvid: id,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/mv/detail 请求失败：", response.data["code"]);
      return {};
    } else {
      if (response.data["data"] === null) {
        console.log("/mv/detail 请求失败：数据为 null");
        return {};
      } else {
        console.log("/mv/detail 请求成功：", response.data["data"]);
        return response.data["data"];
      }
    }
  } catch (error) {
    console.log("/mv/detail 请求失败：", error);
    return {};
  }
};