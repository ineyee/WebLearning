/*
  登录模块接口的数据层

  数据层（repository）的职责就是直接与数据库打交道，调用数据层你就可以获取到 rawData。换句话说，数据层只需要对自己负责就行，负责的体现就是干好创建 SQL 语句、执行 SQL 语句、获取执行结果、返回执行结果给业务层即可；其它的数据层就不用关心了，至于执行结果失败了怎样、成功了怎样，那是业务层拿到结果后该干的事

  实践经验：
    * 总是把执行成功的结果返回（虽然增删改操作执行成功的结果意义不大、查操作执行成功的结果意义才大），业务层用不用执行成功的结果由它自己决定
    * 这里不需要 try-catch 执行失败的异常，不处理的话默认情况下异常就会自动往上层抛、抛到业务层
*/

// 导入连接池以便访问数据库
const connectionPool = require("../database.js");

// 第一步：创建 Repository 类
class LoginRepository {
  // 第二步：创建一个实例方法，来实现某个接口的数据层逻辑
  // 因为这个实例方法的定位不是个中间件，所以它的参数可以自由定义
  async readUserByEmail(email) {
    // 创建 SQL 语句
    const statement = `
      SELECT
      * 
      FROM
      \`t_user\`
      WHERE
      \`email\` = ?;
    `;

    // 执行 SQL 语句 + 获取执行结果
    const [result] = await connectionPool.execute(statement, [email]);

    // 返回执行结果
    return result;
  }
}

// 第三步：创建并导出 Repository 实例
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = new LoginRepository();
