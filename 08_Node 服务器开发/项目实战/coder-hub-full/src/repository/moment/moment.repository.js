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
    // 第一版查询语句是：查询动态的时候，把动态所属的用户也给查询出来
    // const statement = `
    //   SELECT
    //     t_moment.id AS id,
    //     t_moment.content AS content,
    //     t_moment.createTime AS createTime,
    //     t_moment.updateTime AS updateTime,
    //     JSON_OBJECT(
    //       'id', t_user.id,
    //       'username', t_user.username,
    //       'email', t_user.email
    //     ) AS 'user'
    //   FROM t_moment
    //   LEFT JOIN t_user
    //   ON t_moment.userId = t_user.id
    //   LIMIT ? OFFSET ?;
    // `;

    // 第二版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来、所以再加一条 LEFT JOIN
    // 其实这么复杂的数据结构，我们完全可以分离成两个接口让客户端分别发起，而不要在一个接口里搞这么复杂
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
        ) AS 'user',
        JSON_OBJECT(
          -- 计算分组后每动态的评论总数
          'totalCount', COUNT(t_comment.id)
        ) AS 'comment'
      FROM t_moment
      LEFT JOIN t_user ON t_moment.userId = t_user.id
      LEFT JOIN t_comment ON t_moment.id = t_comment.momentId && t_comment.commentId IS NULL GROUP BY t_moment.id
      LIMIT 3 OFFSET 0;
    `;

    const [result] = await connectionPool.execute(statement, [
      String(pageSize),
      String(pageSize * pageIndex),
    ]);

    return result;
  }

  async getMomentDetail(momentId) {
    // 第一版查询语句是：查询动态的时候，把动态所属的用户也给查询出来
    // const statement = `
    //   SELECT
    //     t_moment.id AS id,
    //     t_moment.content AS content,
    //     t_moment.createTime AS createTime,
    //     t_moment.updateTime AS updateTime,
    //     JSON_OBJECT(
    //       'id', t_user.id,
    //       'username', t_user.username,
    //       'email', t_user.email
    //     ) AS 'user'
    //   FROM t_moment
    //   LEFT JOIN t_user
    //   ON t_moment.userId = t_user.id
    //   WHERE t_moment.id = ?;
    // `;

    // 第二版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来、所以再加一条 LEFT JOIN
    // 其实这么复杂的数据结构，我们完全可以分离成两个接口让客户端分别发起，而不要在一个接口里搞这么复杂
    // const statement = `
    //   SELECT
    //     t_moment.id AS id,
    //     t_moment.content AS content,
    //     t_moment.createTime AS createTime,
    //     t_moment.updateTime AS updateTime,
    //     JSON_OBJECT(
    //       'id', t_user.id,
    //       'username', t_user.username,
    //       'email', t_user.email
    //     ) AS 'user',
    //     JSON_OBJECT(
    //       -- 计算分组后每动态的评论总数
    //       'totalCount', COUNT(t_comment.id),
    //       'list', JSON_ARRAYAGG(
    //         JSON_OBJECT(
    //           'id', t_comment.id,
    //           'content', t_comment.content,
    //           'createTime', t_comment.createTime,
    //           'updateTime', t_comment.updateTime
    //         )
    //       )
    //     ) AS 'comment'
    //   FROM t_moment
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   LEFT JOIN t_comment ON t_moment.id = t_comment.momentId && t_comment.commentId IS NULL GROUP BY t_moment.id
    //   LIMIT 3 OFFSET 0;
    // `;

    // 第三版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来，而且还要把评论所属的用户也给查询出来、所以再加一条 LEFT JOIN
    // 其实这么复杂的数据结构，我们完全可以分离成两个接口让客户端分别发起，而不要在一个接口里搞这么复杂
    const statement = `
      SELECT
        t_moment.id AS id,
        t_moment.content AS content,
        t_moment.createTime AS createTime,
        t_moment.updateTime AS updateTime,
        JSON_OBJECT(
          'id', mu.id,
          'username', mu.username,
          'email', mu.email
        ) AS 'user',
        JSON_OBJECT(
          -- 计算分组后每动态的评论总数
          'totalCount', COUNT(t_comment.id),
          'list', JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', t_comment.id,
              'content', t_comment.content,
              'createTime', t_comment.createTime,
              'updateTime', t_comment.updateTime,
              'user', JSON_OBJECT(
                'id', cm.id,
                'username', cm.username,
                'email', cm.email
              )
            )
          )
        ) AS 'comment'
      FROM t_moment
      LEFT JOIN t_user as mu ON t_moment.userId = mu.id
      LEFT JOIN t_comment ON t_moment.id = t_comment.momentId && t_comment.commentId IS NULL
      LEFT JOIN t_user as cm ON t_comment.userId = cm.id
      GROUP BY t_moment.id
      LIMIT 3 OFFSET 0;
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
