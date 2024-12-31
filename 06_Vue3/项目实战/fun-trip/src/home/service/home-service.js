import httpRequest from "@/network/http-request";

// JS里强调函数式编程，是真不写类啊，就像很多hook函数也是一样的直接写个函数导出出去了
export async function getHotSuggests() {
  try {
    const response = await httpRequest.get({
      url: "http://123.207.32.32:1888/api/home/hotSuggests",
    });

    if (response["errcode"] !== 0) {
      console.log(`getHotSuggests失败：${response["errcode"]}`);
      return [];
    } else {
      if (response["data"] === null) {
        console.log(`getHotSuggests失败：数据为null`);
        return [];
      } else {
        return response["data"];
      }
    }
  } catch (error) {
    console.log(`getHotSuggests出错：${error}`);
    return [];
  }
};

export async function getCategories() {
  try {
    const response = await httpRequest.get({
      url: "http://123.207.32.32:1888/api/home/categories",
    });

    if (response["errcode"] !== 0) {
      console.log(`getCategories失败：${response["errcode"]}`);
      return [];
    } else {
      if (response["data"] === null) {
        console.log(`getCategories失败：数据为null`);
        return [];
      } else {
        return response["data"];
      }
    }
  } catch (error) {
    console.log(`getCategories出错：${error}`);
    return [];
  }
};

export async function getHouseList(page) {
  try {
    const response = await httpRequest.get({
      url: "http://123.207.32.32:1888/api/home/houselist",
      params: {
        page: page,
      },
    });

    if (response["errcode"] !== 0) {
      console.log(`getHouseList失败：${response["errcode"]}`);
      return [];
    } else {
      if (response["data"] === null) {
        console.log(`getHouseList失败：数据为null`);
        return [];
      } else {
        return response["data"];
      }
    }
  } catch (error) {
    console.log(`getHouseList出错：${error}`);
    return [];
  }
};