const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../../config/path/path.config");

const uploader = multer({
  // 指定文件如何存储
  storage: multer.diskStorage({
    // 存储路径：这里存储在根目录下的 uploads 文件夹里，这个 uploads 文件夹需要我们自己手动创建
    destination: (req, file, callback) => {
      callback(null, UPLOAD_PATH);
    },
    // 文件名：这里使用时间戳拼上文件的原始名称
    filename: (req, file, callback) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

module.exports = uploader;
