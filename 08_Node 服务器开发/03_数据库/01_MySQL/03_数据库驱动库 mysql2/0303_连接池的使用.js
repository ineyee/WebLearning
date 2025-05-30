// 第一步：安装 mysql2，cd 到项目根目录，执行“npm install mysql2”即可

// 第二步：导入 mysql2 这个库
const mysql = require("mysql2");

// 第三步：新建一个连接池，连接上我们已启动的某个 MySQL 服务及数据库（同步操作）
//
// 之前我们的服务里只创建了一个连接，而在 MySQL 里同一个连接上的查询操作（这里的查询也指的是广义的查询——即增删改查）只能串行执行、无法并行执行
// 这就意味着如果只有一个用户通过我们的服务向我们的数据库发起查询操作的话，一个连接是没有问题的；但如果有十个用户同时通过我们的服务向我们的数据库发起查询操作，那一个连接就不够用了，必然会有用户处于等待的状态、等前面的用户查询完了才能轮到给他返回查询结果，这样就导致查询效率非常低
//
// 因此，我们就需要创建多个连接来处理多个用户并发查询的场景
// 事实上，mysql2 给我们提供了一个连接池，连接池会在其它连接都处于 busy 状态的时候自动创建新连接，等新连接使用完后不会销毁，而是放到连接池中，以便后续使用，所以我们不需要手动去创建很多连接，只需要常见一个连接池就可以了，这样就可以避免我们手动管理多连接的麻烦
//
// 当然我们也不能无限制地往连接池里创建连接，因为过多的连接也会带来过大的内存开销和资源开销，应用过载的话是有可能导致数据库崩溃的
// 因此，我们一般都会设置连接池的大小来限制连接的最大数量，通用经验法则：
// ​* 小型应用​（低并发）：10~20
// * ​中型应用​（中等并发）：20~50
// * ​大型应用​（高并发）：50~100（需结合数据库配置）
//
// 连接池的核心工作原理：
// 假设连接池配置为 connectionLimit: 2，同时有 3 个并发请求，那么：
// 请求 1 和 2 立即分配到连接 1 和 2
// 请求 3 进入队列等待，直到前两个连接有某个连接释放，再分配执行
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
*/
const selectStatement = `
  SELECT * FROM \`t_song\` WHERE \`id\` > 3;
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
    const result = await connectionPool.promise().query(selectStatement);
    console.log("查询数据成功：", result[0]);
  } catch (error) {
    console.log("查询数据失败：", error);
  }
}
selectSongs();
