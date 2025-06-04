// 中间件里一般是直接定义函数，不再定义类了

// 导入验证库
const validator = require("validator");

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
      code: -1001,
      message: "邮箱不能为空",
    };
    // 结束当前中间件的执行
    return;
  }

  if (!params.username) {
    ctx.body = {
      code: -1002,
      message: "用户名不能为空",
    };
    return;
  }

  if (!params.password) {
    ctx.body = {
      code: -1003,
      message: "密码不能为空",
    };
    return;
  }

  // 字段长度校验
  if (params.username.length > 100 || params.password.length > 100) {
    ctx.body = {
      code: -1004,
      message: "用户名或密码长度不能大于 100 个字符",
    };
    return;
  }

  // 字段格式校验
  if (validator.isEmail(params.email) === false) {
    ctx.body = {
      code: -1005,
      message: "邮箱格式不正确",
    };
    return;
  }

  // 所有检验通过，则调用 next() 继续执行下一个中间件
  await next();
};

module.exports = {
  verifyRegisterParams,
};
