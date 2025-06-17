const responseError = {
  // 登录模块错误码（-2000到-2999）
  LOGIN: {
    EMAIL_IS_REQUIRED: {
      code: -2000,
      message: "邮箱不能为空",
    },
    USERNAME_IS_REQUIRED: {
      code: -2001,
      message: "用户名不能为空",
    },
    PASSWORD_IS_REQUIRED: {
      code: -2002,
      message: "密码不能为空",
    },
    USERNAME_OR_PASSWORD_IS_TOO_LONG: {
      code: -2003,
      message: "用户名或密码长度不能大于 100 个字符",
    },
    EMAIL_FORMAT_IS_INCORRECT: {
      code: -2004,
      message: "邮箱格式不正确",
    },
    USER_NOT_EXISTS: {
      code: -2005,
      message: "用户不存在",
    },
    PASSWORD_ERROR: {
      code: -2006,
      message: "密码错误",
    },
  },
};

module.exports = {
  ...responseError,
};
