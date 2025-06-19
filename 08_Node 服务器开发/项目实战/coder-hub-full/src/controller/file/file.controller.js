const fs = require("fs");
const responseSuccess = require("../../config/response/response-success.config");
const userService = require("../../service/user/user.service");
const {
  SERVER_HOST,
  SERVER_PORT,
} = require("../../config/server/server.config");
const { UPLOAD_PATH } = require("../../config/path/path.config");

class FileController {
  async uploadAvatar(ctx, next) {
    const { id } = ctx.tokenInfo;
    const { filename } = ctx.file;

    try {
      await userService.uploadAvatar(
        id,
        // 这个地址对应“通过 avatarUrl 读取头像”接口的路径
        `${SERVER_HOST}:${SERVER_PORT}/file/avatar/${filename}`
      );

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: {
          avatarUrl: `${SERVER_HOST}:${SERVER_PORT}/file/avatar/${filename}`,
        },
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async getAvatar(ctx, next) {
    const { avatarName } = ctx.request.params;
    const filePath = `${UPLOAD_PATH}/${avatarName}`;
    ctx.body = fs.createReadStream(filePath);
  }
}

module.exports = new FileController();
