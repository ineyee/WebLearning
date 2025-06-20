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

  async getMomentList(ctx, next) {
    const { pageSize, pageIndex } = ctx.query;

    try {
      const result = await momentService.getMomentList(pageSize, pageIndex);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async getMomentDetail(ctx, next) {
    var { momentId } = ctx.query;
    if (!momentId) {
      momentId = ctx.params.momentId;
    }

    try {
      const result = await momentService.getMomentDetail(momentId);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async updateMoment(ctx, next) {
    const { momentId, content } = ctx.request.body;

    try {
      await momentService.updateMoment(momentId, content);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async deleteMoment(ctx, next) {
    const { momentId } = ctx.request.body;

    try {
      await momentService.deleteMoment(momentId);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async batchDeleteMoment(ctx, next) {
    const { momentIdList } = ctx.request.body;

    try {
      await momentService.batchDeleteMoment(momentIdList);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }

  async addLabel(ctx, next) {
    const { momentId, labelIdList } = ctx.request.body;

    try {
      await momentService.addLabel(momentId, labelIdList);

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: null,
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
