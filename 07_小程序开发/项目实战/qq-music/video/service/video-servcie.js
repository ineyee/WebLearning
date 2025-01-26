import httpRequest from '../../network/http-request';

// 强调函数式编程，不写类，就像很多 hook 函数也是一样的直接写个函数导出出去了
export async function getTopMv(limit, offset) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/top/mv",
      params: {
        limit: limit,
        offset: offset,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/top/mv 请求失败：", response.data["code"]);
      return [];
    } else {
      if (response.data["data"] === null) {
        console.log("/top/mv 请求失败：数据为null");
        return [];
      } else {
        console.log("/top/mv 请求成功：", response.data["data"]);
        return response.data["data"];
      }
    }
  } catch (error) {
    console.log("/top/mv 请求失败：", error);
    return [];
  }
};