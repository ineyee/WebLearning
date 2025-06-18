/*
  登录模块接口的业务层

  业务层（service）的职责就是处理我们实际的业务逻辑，如业务规则校验、数据库事务管理等，业务层内部在调用数据层的 API，等待数据层给它返回 rawData，然后把 rawData 处理成表现层能直接返回给客户端的数据、以便交付给表现层。换句话说，业务层要绝对相信表现层，相信的体现就是直接拿着参数去做业务，而不再纠结于参数会不会出问题，要绝对相信经过表现层校验后的参数是肯定没问题的；业务层要对表现层负责，负责的体现就是交付给表现层的数据必须是直接能用的；其它的业务层就不用关心了

  实践经验：
    * 总是把执行成功的结果返回，表现层用不用执行成功的结果由它自己决定
    * 业务规则校验出错或做业务出错时，需要我们主动抛出异常、抛到表现层
    * 这里不需要 try-catch 数据层 API 执行失败的异常，不处理的话默认情况下异常就会自动往上层抛、抛到表现层
*/

const jwt = require("jsonwebtoken");
// 导入数据层
const userRepository = require("../../repository/user/user.repository");
// 导入登录模块响应错误的状态码和消息
const loginError = require("../../config/response/response-error.config").LOGIN;
// 导入加密工具函数
const { md5Password } = require("../../util/md5-password.utils");
// 导入私钥
const { PRIVATE_KEY } = require("../../config/secret-key/secret-key.config");

// 第一步：创建 Service 类
class LoginService {
  // 第二步：创建一个实例方法，来实现某个接口的业务层逻辑
  // 因为这个实例方法的定位不是个中间件，所以它的参数可以自由定义
  async login(params) {
    // 1、业务规则校验
    // 1.1 规则校验失败，抛出错误信息
    // 1.2 规则校验成功，执行后续逻辑

    // 用户存不存在
    const readUserResult = await userRepository.readUserByEmail(params.email);
    if (readUserResult.length <= 0) {
      throw {
        code: loginError.USER_NOT_EXISTS.code,
        message: loginError.USER_NOT_EXISTS.message,
      };
    }

    // 密码是否正确
    const user = readUserResult[0];
    if (user.password !== md5Password(params.password)) {
      throw {
        code: loginError.PASSWORD_ERROR.code,
        message: loginError.PASSWORD_ERROR.message,
      };
    }

    // 2、做业务
    // 生成 token：把用户的 id 挂载到 token 里
    const token = jwt.sign({ id: user.id }, PRIVATE_KEY, {
      expiresIn: 30 * 24 * 60 * 60,
      algorithm: "RS256",
    });
    // 把 token 上交给表现层
    return token;
  }
}

// 第三步：创建并导出 Service 实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = new LoginService();
