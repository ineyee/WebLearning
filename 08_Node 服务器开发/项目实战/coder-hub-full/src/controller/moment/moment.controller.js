const responseSuccess = require("../../config/response/response-success.config");
const momentService = require("../../service/moment/moment.service");

class MomentController {
  async createMoment(ctx, next) {
    const params = ctx.request.body;
    const userId = ctx.tokenInfo.id;

    try {
      const result = await momentService.createMoment(params, userId);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: {
          id: result.insertId,
        },
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }
}

module.exports = new MomentController();
