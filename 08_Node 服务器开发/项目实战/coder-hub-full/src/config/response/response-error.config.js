const commonResponseError = require("./response-error-common.config");
const registerResponseError = require("./response-error-register.config");
const loginResponseError = require("./response-error-login.config");
const momentResponseError = require("./response-error-moment.config");

module.exports = {
  ...commonResponseError,
  ...registerResponseError,
  ...loginResponseError,
  ...momentResponseError,
};
