// 中间件里一般是直接定义函数，不再定义类了

const jwt = require("jsonwebtoken");
const responseErrorCommon =
  require("../../config/response/response-error.config").COMMON;
// 导入公钥
const { PUBLIC_KEY } = require("../../config/secret-key/secret-key.config");

// 因为这个方法的定位是个中间件，所以它的参数必须和中间件的参数一样
//
// 上一个中间件里如果是【返回响应、结束本次请求】，下一个中间件不会被执行；上一个中间件里如果【调用 next 函数执行下一个中间件】，下一个中间件才会被执行
const verifyToken = async (ctx, next) => {
  // 获取 token
  const token = ctx.request.header["token"];

  // token 是否为空
  // !token 可以校验：
  // * 是否传了 token 字段
  // * token 字段是不是 undefined
  // * token 字段是不是 null
  // * token 字段是不是 ""
  if (!token) {
    ctx.body = {
      code: responseErrorCommon.TOKEN_IS_REQUIRED.code,
      message: responseErrorCommon.TOKEN_IS_REQUIRED.message,
    };
    return;
  }

  // 检验 token
  try {
    const tokenInfo = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 把 token 里的用户信息赋值给 ctx.tokenInfo 属性，以备后续其它地方读取使用
    ctx.tokenInfo = tokenInfo;

    // 所有检验通过，则调用 next() 继续执行下一个中间件
    await next();
  } catch (error) {
    ctx.body = {
      code: responseErrorCommon.TOKEN_IS_INVALID.code,
      message: responseErrorCommon.TOKEN_IS_INVALID.message,
    };
  }
};

module.exports = {
  verifyToken,
};
