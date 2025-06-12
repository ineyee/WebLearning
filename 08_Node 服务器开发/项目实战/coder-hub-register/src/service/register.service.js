/*
  用户模块接口的业务层

  业务层（service）的职责就是处理我们实际的业务逻辑，如业务规则校验、数据库事务管理等，业务层内部在调用数据层的 API，等待数据层给它返回 rawData，然后把 rawData 处理成表现层能直接返回给客户端的数据、以便交付给表现层。换句话说，业务层要绝对相信表现层，相信的体现就是直接拿着参数去做业务，而不再纠结于参数会不会出问题，要绝对相信经过表现层校验后的参数是肯定没问题的；业务层要对表现层负责，负责的体现就是交付给表现层的数据必须是直接能用的；其它的业务层就不用关心了

  实践经验：
    * 调用数据层的 API 时如果出错了，数据库驱动库会自己抛出异常，所以我们就不用再手动抛出异常了，不处理数据库驱动库抛出的异常、异常就会继续往上抛、直到被表现层捕获，所以这里只调用数据层的 API 即可
    * 业务规则的校验如果出错了，才需要我们手动抛出异常
    * 其它情况正常执行即可
    * 函数需要返回值时再返回，不需要是就不要返回
*/

// 导入数据层
const userRepository = require("../repository/register.repository");
// 导入用户模块响应错误的状态码和消息
const userError = require("../config/response-error.config").USER;
// 导入加密工具函数
const { md5Password } = require("../util/md5-password.utils");

// 第一步：创建 Service 类
class UserService {
  // 第二步：创建一个实例方法，来实现某个接口的业务层逻辑
  // 因为这个实例方法的定位不是个中间件，所以它的参数可以自由定义
  async register(params) {
    // 1、业务规则校验
    // 1.1 规则校验失败，抛出错误信息
    // 1.2 规则校验成功，执行后续逻辑
    const readUserResult = await userRepository.readUserByEmail(params.email);
    if (readUserResult.length > 0) {
      throw {
        code: userError.EMAIL_IS_ALREADY_EXISTS.code,
        message: userError.EMAIL_IS_ALREADY_EXISTS.message,
      };
    }

    // 2、调用数据层的 API，将客户端传递过来的参数存储到数据库中
    params.password = md5Password(params.password); // 这里可以加密密码
    await userRepository.createUser(params);
  }
}

// 第三步：创建并导出 Service 实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = new UserService();
