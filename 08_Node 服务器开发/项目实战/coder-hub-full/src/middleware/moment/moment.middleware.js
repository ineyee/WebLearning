const responseErrorCommon =
  require("../../config/response/response-error.config").COMMON;
const responseErrorMoment =
  require("../../config/response/response-error.config").MOMENT;
const momentService = require("../../service/moment/moment.service");

const verifyMomentParams = async (ctx, next) => {
  const params = ctx.request.body;

  if (!params.content) {
    ctx.body = {
      code: responseErrorMoment.MOMENT_IS_REQUIRED.code,
      message: responseErrorMoment.MOMENT_IS_REQUIRED.message,
    };
    return;
  }

  await next();
};

const verifyMomentPermission = async (ctx, next) => {
  const { momentId } = ctx.request.body;
  const { id } = ctx.tokenInfo;

  try {
    const result = await momentService.getMomentExistState(momentId, id);
    if (!result) {
      ctx.body = {
        code: responseErrorCommon.NO_OPERATION_PERMISSION.code,
        message: responseErrorCommon.NO_OPERATION_PERMISSION.message,
      };
      return;
    }

    await next();
  } catch (error) {
    ctx.body = {
      code: error.code,
      message: error.message,
    };
  }
};

module.exports = {
  verifyMomentParams,
  verifyMomentPermission,
};
