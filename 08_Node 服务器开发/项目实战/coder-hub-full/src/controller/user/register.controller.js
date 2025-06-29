/*
  注册模块接口的表现层

  表现层（controller）的职责就是直接与客户端打交道，如接收客户端的请求参数、对客户端的请求参数进行基础有效性校验、调用业务层的 API 拿到客户端直接能用 JSON 或 HTML 等数据、给客户端返回响应。换句话说，表现层要对客户端负责，负责的体现就是返回给客户端直接能用的有效数据或错误信息；表现层要对业务层负责，负责的体现就是传递给业务层的参数必须是有效的；其它的表现层就不用关心了。在表现层进行参数的基础有效性校验是为了在请求进入业务逻辑前就拒绝非法格式，避免无效数据渗透到下层，主要包含：必填字段校验、字段长度校验、字段格式校验等，其它跟业务相关的校验就交给业务层去校验

  实践经验：
    * 接口到底是请求成功还是请求失败，统一在表现层处理，失败了就给客户端响应错误，成功了就给客户端响应数据
    * 基础有效性校验出错时，需要直接给客户端响应错误
    * 调用业务层的 API 时一定要用 try-catch，因为数据层和业务层的异常它们都没处理、都是继续上抛到表现层来统一处理的，catch 到异常时就给客户端响应错误，没有错误时就给客户端响应数据
*/

// 导入业务层
const registerService = require("../../service/user/register.service");
// 导入响应成功的状态码和消息
const responseSuccess = require("../../config/response/response-success.config");

// 第一步：创建 Controller 类
class RegisterController {
  // 第二步：创建一个实例方法，来实现某个接口的表现层逻辑
  // 因为这个实例方法的定位是个中间件，所以它的参数必须和中间件的参数一样
  //
  // 最佳实践是：
  // 1、把“对客户端的请求参数进行基础有效性校验”的代码抽取到一个专门的中间件里（类似于 VM 给 Controller 减负），这样一来校验逻辑也可以复用
  // 2、在路由文件里把这个专门的中间件挂载到对应的路由上，确保在表现层中间件之前执行
  // 3、在表现层中间件里去掉基础有效性验证的代码、直接调用业务层的 API 即可，更加专注于接收参数和响应数据
  // 这样就可以把表现层中间件的代码量大大减少，变得更清晰、更易维护
  async register(ctx, next) {
    // 1、接收客户端的请求参数
    // bodyParser 中间件内部就是在解析 post 请求体里的数据，解析成 jsonObj 后，会把 jsonObj 赋值给 ctx.request.body 属性
    const params = ctx.request.body;

    // 2、调用业务层的 API，将客户端传递过来的参数存储到数据库中
    // 2.1 存储数据库操作失败，返回错误信息
    // 2.2 存储数据库操作成功，执行后续逻辑
    try {
      await registerService.register(params);
      // 3、将注册成功的结果返回给客户端
      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }
}

// 第三步：创建并导出 Controller 实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = new RegisterController();
