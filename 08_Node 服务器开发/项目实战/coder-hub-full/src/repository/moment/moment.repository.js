const connectionPool = require("../../database.js");

class MomentRepository {
  async createMoment(params, userId) {
    // 创建 SQL 语句
    const statement = `
      INSERT INTO
      \`t_moment\` 
      (\`content\`, \`userId\`)
      VALUES
      (?, ?);
    `;

    // 执行 SQL 语句 + 获取执行结果
    const [result] = await connectionPool.execute(statement, [
      params.content,
      userId,
    ]);

    // 返回执行结果
    return result;
  }

  async getMomentList(pageSize, pageIndex) {
    // 创建 SQL 语句
    const statement = `
      SELECT
      t_moment.id AS id,
      t_moment.content AS content,
      t_moment.createTime AS createTime,
      t_moment.updateTime AS updateTime,
      JSON_OBJECT(
        'id', t_user.id,
        'username', t_user.username,
        'email', t_user.email
      ) AS 'user'
      FROM t_moment
      LEFT JOIN t_user
      ON t_moment.userId = t_user.id
      LIMIT ? OFFSET ?;
    `;

    // 执行 SQL 语句 + 获取执行结果
    const [result] = await connectionPool.execute(statement, [
      String(pageSize),
      String(pageSize * pageIndex),
    ]);

    // 返回执行结果
    return result;
  }
}

module.exports = new MomentRepository();
