const { commonResponseError } = require("./response-error-common.config");
const { registerResponseError } = require("./response-error-register.config");
const { loginResponseError } = require("./response-error-login.config");

const responseError = {
  ...commonResponseError,
  ...registerResponseError,
  ...loginResponseError,
};

module.exports = {
  ...responseError,
};
