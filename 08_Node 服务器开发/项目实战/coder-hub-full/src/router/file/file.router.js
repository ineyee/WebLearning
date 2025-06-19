const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const uploader = require("../../middleware/file/file.middleware");
const fileController = require("../../controller/file/file.controller");

const router = new KoaRouter({
  prefix: "/file",
});

// 上传头像
router.post(
  "/uploadAvatar",
  verifyToken,
  uploader.single("file"),
  fileController.uploadAvatar
);

// 通过 avatarUrl 读取头像
router.get("/avatar/:avatarName", fileController.getAvatar);

module.exports = router;

/*
  注意：上传文件必然得写两个接口，它们是成对出现的
    * 一个是上传文件的接口，让客户端开发调用的
    * 一个是读取文件的接口，这个接口是隐式的、不是让客户端开发调用的，而是确保用户能通过 fileUrl 拿到文件数据用的
*/
