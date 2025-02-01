import httpRequest from '../../network/http-request';

// 强调函数式编程，不写类，就像很多 hook 函数也是一样的直接写个函数导出出去了
export async function getSongDetail(id) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/song/detail",
      params: {
        ids: id,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/song/detail 请求失败：", response.data["code"]);
      return {};
    } else {
      if (response.data["data"] === null) {
        console.log("/song/detail 请求失败：数据为 null");
        return {};
      } else {
        console.log("/song/detail 请求成功：", response.data["songs"][0]);
        return response.data["songs"][0];
      }
    }
  } catch (error) {
    console.log("/song/detail 请求失败：", error);
    return {};
  }
};

export async function getLyric(id) {
  try {
    const response = await httpRequest.get({
      url: "http://codercba.com:9002/lyric",
      params: {
        id: id,
      },
    });

    if (response.data["code"] !== 200) {
      console.log("/lyric 请求失败：", response.data["code"]);
      return {};
    } else {
      if (response.data["data"] === null) {
        console.log("/lyric 请求失败：数据为 null");
        return {};
      } else {
        console.log("/lyric 请求成功：", response.data["lrc"]);
        return response.data["lrc"];
      }
    }
  } catch (error) {
    console.log("/lyric 请求失败：", error);
    return {};
  }
};