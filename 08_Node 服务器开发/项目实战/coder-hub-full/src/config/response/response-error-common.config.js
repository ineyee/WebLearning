// 通用错误码（-1到-999）
const commonResponseError = {
  COMMON: {
    EMAIL_IS_REQUIRED: {
      code: -1,
      message: "邮箱不能为空",
    },
    USERNAME_IS_REQUIRED: {
      code: -2,
      message: "用户名不能为空",
    },
    PASSWORD_IS_REQUIRED: {
      code: -3,
      message: "密码不能为空",
    },
    USERNAME_OR_PASSWORD_IS_TOO_LONG: {
      code: -4,
      message: "用户名或密码长度不能大于 100 个字符",
    },
    EMAIL_FORMAT_IS_INCORRECT: {
      code: -5,
      message: "邮箱格式不正确",
    },
  },
};

module.exports = {
  commonResponseError,
};
