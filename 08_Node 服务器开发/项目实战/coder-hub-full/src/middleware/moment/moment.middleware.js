const responseErrorMoment =
  require("../../config/response/response-error.config").MOMENT;

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

module.exports = {
  verifyMomentParams,
};
