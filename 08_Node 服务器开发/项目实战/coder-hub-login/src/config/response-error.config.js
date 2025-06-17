const responseError = {
  // 登录模块错误码（-2000到-2999）
  LOGIN: {
    EMAIL_IS_REQUIRED: {
      code: -2000,
      message: "token 无效",
    },
  },
};

module.exports = {
  ...responseError,
};
