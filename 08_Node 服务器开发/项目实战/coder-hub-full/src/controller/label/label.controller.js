const responseSuccess = require("../../config/response/response-success.config");
const labelService = require("../../service/label/label.service");

class LabelController {
  async createLabel(ctx, next) {
    const { name } = ctx.request.body;

    try {
      const result = await labelService.createLabel(name);

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

module.exports = new LabelController();
