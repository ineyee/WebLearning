/*
  事务（Transaction）的核心理念是确保多个操作​要么全部成功，要么全部失败，从而维护数据的完整性和一致性
  直白地说，事务就是指把多条 SQL 语句当作一个操作序列来执行，只有所有的 SQL 语句都执行成功这个操作序列才算执行成功，其中任意一条 SQL 语句执行失败这个操作序列就算执行失败，失败后我们可以把数据回滚到原始状态。事务一般是以开启事务开始，提交事务或回滚事务结束
  
  比如张三给李四转钱，张三扣钱这个操作和李四加钱这个操作就应该当做一个操作序列来执行，只有张三扣钱成功 + 李四加钱成功同时发生这个操作才能算成功，如果不采用事务来做，那很可能出现张三扣钱成功了，李四加钱的时候刚好数据库崩溃了，这样结果就是张三白白丢了钱
*/

// 第一步：安装 mysql2，cd 到项目根目录，执行“npm install mysql2”即可

// 第二步：导入 mysql2 这个库
const mysql = require("mysql2");

// 第三步：新建一个连接池，连接上我们已启动的某个 MySQL 服务及数据库（同步操作）
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mysqlyiyi0202!",
  database: "test_db",
  connectionLimit: 10, // 最大连接数
  /*
    推荐设置当前会话时区为零时区，以便 MySQL 能正确处理 TIMESTAMP 字段
    因为 TIMESTAMP 字段的默认值是获取服务器所在时区的时间，如服务器 1 部署在东八区，那么用户 1 通过东八区的服务器注册时存储在数据库的 createTime 就是东八区的时间 "2025-06-17 17:59:00"、并且没有携带时区信息，用户 2 通过西八区的服务器注册时存储在数据库的 createTime 就是西八区的时间 "2025-06-17 09:59:00"、并且没有携带时区信息，这样在西八区展示东八区用户的 createTime 就会有问题，因为我们不知道 "2025-06-17 17:59:00" 是东八区的、也没法转换为西八区对应的时间，因此我们统一把 TIMESTAMP 字段都设置成零时区的，各个区在拿到时间后转换成自己时区的时间展示即可
  */
  timezone: "+00:00",
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

// 第四步：创建和执行 SQL 语句
async function transferMoney(sender, receiver, amount) {
  // 从连接池里获取一个连接，确保事务里的所有操作都在同一个连接上执行，事务里的操作如果在不同的连接上执行，那数据就会出错，就失去了事务的意义
  // 使用事务的场景，一定要通过获取一个连接的方式来做，但是一旦我们手动获取了连接，就必须手动释放连接，否则连接就会泄漏，导致连接池耗尽
  const connection = await connectionPool.promise().getConnection();

  try {
    // 开启事务
    await connection.beginTransaction();

    // 1. 扣款
    await connection.execute(
      "UPDATE accounts SET balance = balance - ? WHERE user = ?",
      [amount, sender]
    );

    // 2. 收款
    await connection.execute(
      "UPDATE accounts SET balance = balance + ? WHERE user = ?",
      [amount, receiver]
    );

    console.log("转账成功");
    // 提交事务
    await connection.commit();
  } catch (err) {
    console.error("转账失败:", err.message);
    // 回滚事务
    await connection.rollback();
  } finally {
    // 释放连接回池中
    // 使用事务的场景，一定要记得释放连接
    connection.release();
  }
}

// 使用示例
transferMoney("张三", "李四", 200);
