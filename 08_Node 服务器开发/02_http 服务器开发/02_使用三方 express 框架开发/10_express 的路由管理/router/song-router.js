const express = require("express");
const router = express.Router();

router.get("/list", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取歌曲列表成功",
  });
});

router.get("/detail", (req, res, next) => {
  res.json({
    code: 200,
    message: "获取歌曲详情成功",
  });
});

module.exports = router;
