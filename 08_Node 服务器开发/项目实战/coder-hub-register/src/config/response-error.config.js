const responseError = {
  // 注册模块错误码（-1001到-1999）
  REGISTER: {
    EMAIL_IS_REQUIRED: {
      code: -1001,
      message: "邮箱不能为空",
    },
    USERNAME_IS_REQUIRED: {
      code: -1002,
      message: "用户名不能为空",
    },
    PASSWORD_IS_REQUIRED: {
      code: -1003,
      message: "密码不能为空",
    },
    USERNAME_OR_PASSWORD_IS_TOO_LONG: {
      code: -1004,
      message: "用户名或密码长度不能大于 100 个字符",
    },
    EMAIL_FORMAT_IS_INCORRECT: {
      code: -1005,
      message: "邮箱格式不正确",
    },
    EMAIL_IS_ALREADY_EXISTS: {
      code: -1006,
      message: "邮箱已被注册",
    },
  },
};

module.exports = {
  ...responseError,
};