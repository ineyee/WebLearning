/*
  中间件里一般是直接定义函数，不再定义类了

  实践经验：
    * 中间件里允许给客户端返回错误响应，因为中间件就是把本来属于 controller 的代码给抽离出来为 controller 减负的
*/

// 导入验证库
const validator = require("validator");
// 导入注册模块错误码
const registerError = require("../config/response-error.config").REGISTER;

// 因为这个方法的定位是个中间件，所以它的参数必须和中间件的参数一样
//
// 上一个中间件里如果是【返回响应、结束本次请求】，下一个中间件不会被执行；上一个中间件里如果【调用 next 函数执行下一个中间件】，下一个中间件才会被执行
const verifyRegisterParams = async (ctx, next) => {
  // 1、接收客户端的请求参数
  // bodyParser 中间件内部就是在解析 post 请求体里的数据，解析成 jsonObj 后，会把 jsonObj 赋值给 ctx.request.body 属性
  const params = ctx.request.body;

  // 2、对客户端的请求参数进行基础有效性校验
  // 2.1 参数校验失败，返回错误信息
  // 2.2 参数校验成功，执行后续逻辑
  /*
      必填字段校验

      !params.email 可以校验：
        * 是否传了 email 字段
        * email 字段是不是 undefined
        * email 字段是不是 null
        * email 字段是不是 ""
    */
  if (!params.email) {
    // 给客户端返回错误信息
    ctx.body = {
      code: registerError.EMAIL_IS_REQUIRED.code,
      message: registerError.EMAIL_IS_REQUIRED.message,
    };
    // 结束当前中间件的执行
    return;
  }

  if (!params.username) {
    ctx.body = {
      code: registerError.USERNAME_IS_REQUIRED.code,
      message: registerError.USERNAME_IS_REQUIRED.message,
    };
    return;
  }

  if (!params.password) {
    ctx.body = {
      code: registerError.PASSWORD_IS_REQUIRED.code,
      message: registerError.PASSWORD_IS_REQUIRED.message,
    };
    return;
  }

  // 字段长度校验
  if (params.username.length > 100 || params.password.length > 100) {
    ctx.body = {
      code: registerError.USERNAME_OR_PASSWORD_IS_TOO_LONG.code,
      message: registerError.USERNAME_OR_PASSWORD_IS_TOO_LONG.message,
    };
    return;
  }

  // 字段格式校验
  if (validator.isEmail(params.email) === false) {
    ctx.body = {
      code: registerError.EMAIL_FORMAT_IS_INCORRECT.code,
      message: registerError.EMAIL_FORMAT_IS_INCORRECT.message,
    };
    return;
  }

  // 所有检验通过，则调用 next() 继续执行下一个中间件
  await next();
};

module.exports = {
  verifyRegisterParams,
};
