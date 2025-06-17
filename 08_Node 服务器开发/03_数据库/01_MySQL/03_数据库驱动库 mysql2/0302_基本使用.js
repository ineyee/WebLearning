// 第一步：安装 mysql2，cd 到项目根目录，执行“npm install mysql2”即可

// 第二步：导入 mysql2 这个库
const mysql = require("mysql2");

// 第三步：新建一个连接，连接上我们已启动的某个 MySQL 服务及数据库（同步操作）
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mysqlyiyi0202!",
  database: "test_db",
  /*
    推荐设置当前会话时区为零时区，以便 MySQL 能正确处理 TIMESTAMP 字段
    因为 TIMESTAMP 字段的默认值是获取服务器所在时区的时间，如服务器 1 部署在东八区，那么用户 1 通过东八区的服务器注册时存储在数据库的 createTime 就是东八区的时间 "2025-06-17 17:59:00"、并且没有携带时区信息，用户 2 通过西八区的服务器注册时存储在数据库的 createTime 就是西八区的时间 "2025-06-17 09:59:00"、并且没有携带时区信息，这样在西八区展示东八区用户的 createTime 就会有问题，因为我们不知道 "2025-06-17 17:59:00" 是东八区的、也没法转换为西八区对应的时间，因此我们统一把 TIMESTAMP 字段都设置成零时区的，各个区在拿到时间后转换成自己时区的时间展示即可
  */
  timezone: "+00:00",
});
// 发起连接并监听连接结果
connection.connect((err) => {
  if (err) {
    console.error("连接 MySQL 服务和数据库失败：", err.stack);
    return;
  }

  console.log("连接 MySQL 服务和数据库成功，线程ID：", connection.threadId);
});

// 第四步：创建和执行 SQL 语句
// 实际开发中，一般都是先通过 Navicat GUI 工具或命令行先把数据库和表创建好，项目里就只做些增删改查操作，很少在项目里通过代码来创建数据库和表
/*
  创建 SQL 语句（语句我们一般都命名为 statement）
*/
const insertStatement = `
  INSERT INTO \`t_song\` (\`name\`, \`cover\`) VALUES ('七里香', 'https://七里香.jpg');
`;
const deleteStatement = `
  DELETE FROM \`t_song\` WHERE \`id\` = 7;
`;
const updateStatement = `
  UPDATE \`t_song\` SET \`cover\` = 'https://七里香.png' WHERE \`id\` = 1;
`;
const selectStatement = `
  SELECT * FROM \`t_song\` WHERE \`id\` > 3;
`;

/*
  1、回调函数拿结果版执行 SQL 语句
    * 这里 query() 函数的 query 是指 SQL 这个结构化查询语言里广义的 query，不是指增删改查里狭义的 query，所以 query() 函数可以执行任何 SQL 语句
    * query() 函数是个异步操作
*/
// connection.query(insertStatement, (err) => {
//   if (err) {
//     console.log("插入数据失败：", err);
//     return;
//   }
//   console.log("插入数据成功：");
// });

// connection.query(deleteStatement, (err) => {
//   if (err) {
//     console.log("删除数据失败：", err);
//     return;
//   }
//   console.log("删除数据成功：");
// });

// connection.query(updateStatement, (err) => {
//   if (err) {
//     console.log("修改数据失败：", err);
//     return;
//   }
//   console.log("修改数据成功：");
// });

// connection.query(selectStatement, (err, result) => {
//   if (err) {
//     console.log("查询数据失败：", err);
//     return;
//   }
//   console.log("查询数据成功：", result);
// });

/*
  2、Promise 拿结果版执行 SQL 语句
    * 这里 query() 函数的 query 是指 SQL 这个结构化查询语言里广义的 query，不是指增删改查里狭义的 query，所以 query() 函数可以执行任何 SQL 语句
    * query() 函数是个异步操作
*/
// connection.promise().query(selectStatement).then(
//   (result) => {
//     console.log("查询数据成功：", result[0]);
//   },
//   (error) => {
//     console.log("查询数据失败：", error);
//   },
// );

/*
  3、async-await 拿结果版执行 SQL 语句
    * 这里 query() 函数的 query 是指 SQL 这个结构化查询语言里广义的 query，不是指增删改查里狭义的 query，所以 query() 函数可以执行任何 SQL 语句
    * query() 函数是个异步操作
*/
async function selectSongs() {
  try {
    const result = await connection.promise().query(selectStatement);
    console.log("查询数据成功：", result[0]);
  } catch (error) {
    console.log("查询数据失败：", error);
  }
}
selectSongs();
