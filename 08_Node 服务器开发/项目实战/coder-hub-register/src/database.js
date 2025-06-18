// 第一步：导入 mysql2 这个库
const mysql = require("mysql2");
// 导入数据库连接常量
const DataBaseConfig = require("./config/database.config");

// 第二步：新建一个连接池，连接上我们已启动的某个 MySQL 服务及数据库（同步操作）
const connectionPool = mysql.createPool({
  host: DataBaseConfig.CONNECTION_HOST,
  port: DataBaseConfig.CONNECTION_PORT,
  user: DataBaseConfig.CONNECTION_USER,
  password: DataBaseConfig.CONNECTION_PASSWORD,
  database: DataBaseConfig.CONNECTION_DATABASE,
  connectionLimit: DataBaseConfig.CONNECTION_Limit, // 最大连接数
});
// 我们无法直接监听某一条连接是否成功，因为实际执行 SQL 语句时 mysql2 会自动从连接池里获取一个可用的连接来执行，到底用的是连接池里的哪个连接我们无法控制，所以顶多是验证一下“连接池里的连接是否可用”（同步操作）
connectionPool.getConnection((err, tempConn) => {
  if (err) {
    console.error("连接池里的连接不可用：", err.stack);
    return;
  }

  // 尝试用从连接池里获取到一个临时连接连接一下数据库，来验证连接池里的连接是否可用（同步操作）
  tempConn.connect((err) => {
    if (err) {
      console.error("连接池里的连接连接不到数据库：", err.stack);
      return;
    }

    console.log("连接池里的连接可用且可以连接到数据库");
  });
});

// 第三步：导出 Promise 风格的连接池
//
// connectionPool.promise() 函数的返回值是一个支持 Promise 风格的连接池对象。该函数其实就是把原来回调函数风格的连接池转换为了支持 Promise 风格的连接池，这样后续我们就可以使用 async/await 语法来处理异步操作
//
// 导出连接池，这样其他模块就可以直接使用这个连接池来执行 SQL 语句了。注意此时并没有分配连接，只有其它模块在真正使用连接池执行 SQL 语句时才会随机从连接池中分配连接，其它模块每调用这里的连接池执行一次 SQL 语句都会随机分配一个连接，执行完毕后会自动归还到连接池中
//
// 不用大括号的导出类似于 ESModule 里的默认导出，那在导入时也得用类似于 ESModule 里的默认导入——不能使用大括号
module.exports = connectionPool.promise();
