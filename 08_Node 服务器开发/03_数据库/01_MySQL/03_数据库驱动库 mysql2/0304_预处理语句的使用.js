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
// 实际开发中，一般都是先通过 Navicat GUI 工具或命令行先把数据库和表创建好，项目里就只做些增删改查操作，很少在项目里通过代码来创建数据库和表
/*
  创建 SQL 语句（语句我们一般都命名为 statement）

  之前我们是直接把 SQL 语句先写完整，比如：
  const selectStatement = `
    SELECT * FROM \`t_song\` WHERE \`id\` > 3;
  `;
  然后直接塞到 query() 函数里去执行，比如：
  connectionPool.promise().query(selectStatement);
  
  但是这样写的话，如果 SQL 语句里包含变量，比如用户 1 要查询 id 大于 3 的歌曲，用户 2 要查询 id 大于 5 的歌曲，那每次执行一条完整的 SQL 语句时，MySQL 都会重新解析和编译一次 SQL 语句，这样查询性能就比较低
    
  而使用了预处理语句的话（编写 SQL 语句时把原来写死的值都换成问号?，将来执行 SQL 语句时把值作为参数传递进去即可），我们其实是将 SQL 语句模板传递给了 MySQL，MySQL 会对这个语句模板进行解析、编译、缓存
  而当我们真正执行 SQL 语句时、把参数传递进去，MySQL 就不会再对这条 SQL 语句进行解析和编译了，而是直接执行
  所以相当于是解析和编译一次，后续无论执行多少次都不会再解析和编译，所以查询性能更高

  此外预处理语句还可以防止 SQL 注入攻击，因为变量值在执行前会被预处理
*/
const selectStatement = `
  SELECT * FROM \`t_song\` WHERE \`id\` > ?;
`;
/*
  async-await 拿结果版执行 SQL 语句
    * 这里 query() 函数的 query 是指 SQL 这个结构化查询语言里广义的 query，不是指增删改查里狭义的 query，所以 query() 函数可以执行任何 SQL 语句
    * query() 函数是个异步操作
*/
async function selectSongs() {
  try {
    // 这样写的话，connectionPool.promise().query() 函数内部会自动从连接池获取连接，并在查询完成后自动释放连接，因此我们不需要手动获取连接和释放连接
    // 如果我们需要手动获取连接和释放连接，可以使用 connectionPool.promise().getConnection() 函数获取连接，然后在查询完成后调用 connection.release() 释放连接
    const result = await connectionPool.promise().execute(selectStatement, [3]);
    console.log("查询数据成功：", result[0]);
  } catch (error) {
    console.log("查询数据失败：", error);
  }
}
selectSongs();
