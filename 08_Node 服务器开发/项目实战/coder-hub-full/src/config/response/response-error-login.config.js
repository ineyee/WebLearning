// 登录模块错误码（-2000到-2999）
const loginResponseError = {
  LOGIN: {
    USER_NOT_EXISTS: {
      code: -2000,
      message: "用户不存在",
    },
    PASSWORD_ERROR: {
      code: -2001,
      message: "密码错误",
    },
    TOKEN_IS_REQUIRED: {
      code: -2002,
      message: "token 不能为空",
    },
    TOKEN_IS_INVALID: {
      code: -2003,
      message: "token 无效",
    },
  },
};

module.exports = {
  loginResponseError,
};
