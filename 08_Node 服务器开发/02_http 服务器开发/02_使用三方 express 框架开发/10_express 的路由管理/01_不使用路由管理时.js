// 当我们不使用路由管理时，所有模块的所有接口都得直接写在 app 对象上
// 这样当模块和接口越来越多时，会导致 app 对象越来越臃肿，不利于维护

const express = require("express");
const app = express();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 用户模块的接口
app.post("/user/login", (req, res, next) => {
  res.json({
    code: 200,
    message: "登录成功",
  });
});

app.get("/user/info", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取用户信息成功",
  });
});

// 歌曲模块的接口
app.get("/song/list", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取歌曲列表成功",
  });
});

app.get("/song/detail", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取歌曲详情成功",
  });
});
