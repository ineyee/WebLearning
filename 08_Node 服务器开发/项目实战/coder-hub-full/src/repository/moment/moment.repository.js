const connectionPool = require("../../database.js");

class MomentRepository {
  async createMoment(params, userId) {
    const statement = `
      INSERT INTO
      \`t_moment\` 
      (\`content\`, \`userId\`)
      VALUES
      (?, ?);
    `;

    const [result] = await connectionPool.execute(statement, [
      params.content,
      userId,
    ]);

    return result;
  }

  async getMomentList(pageSize, pageIndex) {
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

    const [result] = await connectionPool.execute(statement, [
      String(pageSize),
      String(pageSize * pageIndex),
    ]);

    return result;
  }

  async getMomentDetail(momentId) {
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
      WHERE t_moment.id = ?;
    `;

    const [result] = await connectionPool.execute(statement, [momentId]);

    return result;
  }

  async updateMoment(momentId, content) {
    const statement = `
      UPDATE t_moment SET content = ? WHERE id = ?;
    `;

    const [result] = await connectionPool.execute(statement, [
      content,
      momentId,
    ]);

    return result;
  }

  async getMomentExistState(momentId, userId) {
    const statement = `
      SELECT
      *
      FROM t_moment
      WHERE id = ? AND userId = ?;
    `;

    const [result] = await connectionPool.execute(statement, [
      momentId,
      userId,
    ]);

    return result;
  }

  async deleteMoment(momentId) {
    const statement = `
      DELETE FROM t_moment WHERE id = ?;
    `;

    const [result] = await connectionPool.execute(statement, [momentId]);

    return result;
  }

  async batchDeleteMoment(momentIdList) {
    const momentIds = momentIdList
      .map((momentId) => parseInt(momentId))
      .join(",");
    const statement = `
      DELETE FROM t_moment WHERE id IN (${momentIds});
    `;

    const [result] = await connectionPool.execute(statement);

    return result;
  }
}

module.exports = new MomentRepository();
