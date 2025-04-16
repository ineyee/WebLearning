// 1、专属于用户模块接口的路由文件

const express = require("express");

// 2、创建路由实例
// 一个路由实例也拥有完整的中间件和路由系统，因此它也被称为 mini-app，所以我们可以像使用 app 对象那样使用它
const router = express.Router();

// 3、在路由实例上挂载路由
// 这里的请求路径是相对于 app 对象的请求路径，例如：app.use("/user", userRouter);
// 那么这里的请求路径就是：/user/login
router.post("/login", (req, res, next) => {
  res.json({
    code: 200,
    message: "登录成功",
  });
});

router.get("/info", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取用户信息成功",
  });
});

// 4、导出路由实例
module.exports = router;
