// 这里是整个项目的错误处理中间件，因为整个项目所有的接口返回的错误都是共用的，所以可以抽取出来，不只是针对登录模块，各个模块的接口都可以导入使用。注意：
// 1、错误处理中间件必须有 4 个参数，否则不会生效
// 2、错误处理中间件的触发时机是调用 next 函数且 next 函数传入参数时，比如 next(1001)，单纯地调用 next 函数而不传入参数不会触发错误处理中间件
// 3、使用错误处理中间件时，必须注册在所有其它中间件之后
// 
// 业务状态码：
// 0 代表没有业务逻辑错误
// 1001 代表 token 校验出错
// 1002 代表用户名或密码出错
module.exports = (errorCode, req, res, next) => {
  const code = errorCode;
  let message = "";

  switch (errorCode) {
    case 1001:
      message = "token 校验出错";
      break;
    case 1002:
      message = "用户名或密码出错";
      break;
    default:
      message = "未知错误";
      break;
  }

  res.json({
    "code": code,
    "message": message,
  });
};