import httpRequest from '../../network/http-request';

// 强调函数式编程，不写类，就像很多 hook 函数也是一样的直接写个函数导出出去了
export async function getBanner() {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/banner",
    });

    if (response.data["code"] !== 200) {
      console.log("/banner 请求失败：", response.data["code"]);
      return [];
    } else {
      if (response.data["banners"] === null) {
        console.log("/banner 请求失败：数据为 null");
        return [];
      } else {
        console.log("/banner 请求成功：", response.data["banners"]);
        return response.data["banners"];
      }
    }
  } catch (error) {
    console.log("/banner 请求失败：", error);
    return [];
  }
};

export async function getSongList(id) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/playlist/detail",
      params: {
        id: id,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/playlist/detail 请求失败：", response.data["code"]);
      return [];
    } else {
      if (response.data["banners"] === null) {
        console.log("/playlist/detail 请求失败：数据为 null");
        return [];
      } else {
        console.log("/playlist/detail 请求成功：", response.data["playlist"]["tracks"]);
        return response.data["playlist"]["tracks"];
      }
    }
  } catch (error) {
    console.log("/playlist/detail 请求失败：", error);
    return [];
  }
};