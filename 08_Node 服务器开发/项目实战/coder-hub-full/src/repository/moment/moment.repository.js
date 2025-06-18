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
}

module.exports = new MomentRepository();
