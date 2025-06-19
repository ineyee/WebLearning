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
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   LIMIT ? OFFSET ?;
    // `;

    // 第二版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来
    // 这里用到了 SQL 语句嵌套查询，是允许在 SELECT 语句里嵌套 SELECT 语句的，实现方式也很简单
    //    * 保证每层 SELECT 语句的结构都是基本结构：SELECT + FROM（单表查询）、SELECT + FROM + JOIN（一对多查询）、SELECT + FROM + JOIN + JOIN（多对多查询），千万不要超出这个基本结构，否则查询结果很有可能出错
    //    * 先独立的写好外层 SELECT 语句，再独立的写好内层 SELECT 语句，然后把内层 SELECT 语句复制一份放到外层 SELECT 语句里面用括号括起来就行了
    // 当然如果嵌套的查询语句过于复杂，我们怕查询错的话，可以分多条查询语句分别来查询数据，然后通过 JS 代码把数据组织成最终的格式
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
    //     (
    //       SELECT
    //         JSON_OBJECT(
    //           'totalCount', COUNT(*)
    //         )
    //       FROM t_comment
    //       WHERE t_comment.momentId = t_moment.id && t_comment.commentId IS NULL
    //     ) AS 'comment'
    //   FROM t_moment
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   LIMIT ? OFFSET ?;
    // `;

    // 第三版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来，而且还要把每条动态所有的标签给查询出来
    // 这里用到了 SQL 语句嵌套查询，是允许在 SELECT 语句里嵌套 SELECT 语句的，实现方式也很简单
    //    * 保证每层 SELECT 语句的结构都是基本结构：SELECT + FROM（单表查询）、SELECT + FROM + JOIN（一对多查询）、SELECT + FROM + JOIN + JOIN（多对多查询），千万不要超出这个基本结构，否则查询结果很有可能出错
    //    * 先独立的写好外层 SELECT 语句，再独立的写好内层 SELECT 语句，然后把内层 SELECT 语句复制一份放到外层 SELECT 语句里面用括号括起来就行了
    // 当然如果嵌套的查询语句过于复杂，我们怕查询错的话，可以分多条查询语句分别来查询数据，然后通过 JS 代码把数据组织成最终的格式
    const statement = `
      SELECT
        t_moment.id AS id,
        t_moment.content AS content,
        t_moment.createTime AS createTime,
        t_moment.updateTime AS updateTime,
        JSON_OBJECT(
          'id', t_user.id,
          'username', t_user.username,
          'email', t_user.email,
          'avatarUrl', t_user.avatarUrl
        ) AS 'user',
        (
          SELECT
            JSON_OBJECT(
              'totalCount', COUNT(*)
            )
          FROM t_comment
          WHERE t_comment.momentId = t_moment.id && t_comment.commentId IS NULL
        ) AS 'comment',
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', t_label.id,
              'name', t_label.name
            )
          )
          FROM t_moment AS tm -- 取个别名，避免跟外层查询冲突
          LEFT JOIN t_moment_label ON tm.id = t_moment_label.momentId
          LEFT JOIN t_label ON t_moment_label.labelId = t_label.id
          WHERE tm.id = t_moment.id -- 关联外层查询的 t_moment.id，就知道这个内层嵌套查询语句到底要查哪条动态的标签了
          GROUP BY tm.id
      ) AS 'labelList'
      FROM t_moment
      LEFT JOIN t_user ON t_moment.userId = t_user.id
      LIMIT ? OFFSET ?;
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
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   WHERE t_moment.id = ?;
    // `;

    // 第二版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来
    // 这里用到了 SQL 语句嵌套查询，是允许在 SELECT 语句里嵌套 SELECT 语句的，实现方式也很简单
    //    * 保证每层 SELECT 语句的结构都是基本结构：SELECT + FROM（单表查询）、SELECT + FROM + JOIN（一对多查询）、SELECT + FROM + JOIN + JOIN（多对多查询），千万不要超出这个基本结构，否则查询结果很有可能出错
    //    * 先独立的写好外层 SELECT 语句，再独立的写好内层 SELECT 语句，然后把内层 SELECT 语句复制一份放到外层 SELECT 语句里面用括号括起来就行了
    // 当然如果嵌套的查询语句过于复杂，我们怕查询错的话，可以分多条查询语句分别来查询数据，然后通过 JS 代码把数据组织成最终的格式
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
    //     (
    //       SELECT
    //         JSON_OBJECT(
    //           'totalCount', COUNT(*),
    //           'list', JSON_ARRAYAGG(
    //             JSON_OBJECT(
    //               'id', t_comment.id,
    //               'content', t_comment.content,
    //               'createTime', t_comment.createTime,
    //               'updateTime', t_comment.updateTime
    //             )
    //           )
    //         )
    //       FROM t_comment
    //       WHERE t_comment.momentId = t_moment.id && t_comment.commentId IS NULL
    //     ) AS 'comment'
    //   FROM t_moment
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   WHERE t_moment.id = ?;
    // `;

    // 第三版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来，而且还要把评论所属的用户也给查询出来
    // 这里用到了 SQL 语句嵌套查询，是允许在 SELECT 语句里嵌套 SELECT 语句的，实现方式也很简单
    //    * 保证每层 SELECT 语句的结构都是基本结构：SELECT + FROM（单表查询）、SELECT + FROM + JOIN（一对多查询）、SELECT + FROM + JOIN + JOIN（多对多查询），千万不要超出这个基本结构，否则查询结果很有可能出错
    //    * 先独立的写好外层 SELECT 语句，再独立的写好内层 SELECT 语句，然后把内层 SELECT 语句复制一份放到外层 SELECT 语句里面用括号括起来就行了
    // 当然如果嵌套的查询语句过于复杂，我们怕查询错的话，可以分多条查询语句分别来查询数据，然后通过 JS 代码把数据组织成最终的格式
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
    //     (
    //       SELECT
    //         JSON_OBJECT(
    //           'totalCount', COUNT(*),
    //           'list', JSON_ARRAYAGG(
    //             JSON_OBJECT(
    //               'id', t_comment.id,
    //               'user', JSON_OBJECT(
    //                   'id', t_user.id,
    //                   'username', t_user.username,
    //                   'email', t_user.email
    //               ),
    //               'content', t_comment.content,
    //               'createTime', t_comment.createTime,
    //               'updateTime', t_comment.updateTime
    //             )
    //           )
    //         )
    //       FROM t_comment
    //       LEFT JOIN t_user ON t_comment.userId = t_user.id
    //       WHERE t_comment.momentId = t_moment.id && t_comment.commentId IS NULL
    //     ) AS 'comment'
    //   FROM t_moment
    //   LEFT JOIN t_user ON t_moment.userId = t_user.id
    //   WHERE t_moment.id = ?;
    // `;

    // 第四版查询语句是：查询动态的时候，把动态所属的用户也给查询出来，还要把动态表的从表————评论表里的数据给查出来，而且还要把评论所属的用户也给查询出来，而且还要把当前动态所有的标签给查询出来
    // 这里用到了 SQL 语句嵌套查询，是允许在 SELECT 语句里嵌套 SELECT 语句的，实现方式也很简单
    //    * 保证每层 SELECT 语句的结构都是基本结构：SELECT + FROM（单表查询）、SELECT + FROM + JOIN（一对多查询）、SELECT + FROM + JOIN + JOIN（多对多查询），千万不要超出这个基本结构，否则查询结果很有可能出错
    //    * 先独立的写好外层 SELECT 语句，再独立的写好内层 SELECT 语句，然后把内层 SELECT 语句复制一份放到外层 SELECT 语句里面用括号括起来就行了
    // 当然如果嵌套的查询语句过于复杂，我们怕查询错的话，可以分多条查询语句分别来查询数据，然后通过 JS 代码把数据组织成最终的格式
    const statement = `
      SELECT
        t_moment.id AS id,
        t_moment.content AS content,
        t_moment.createTime AS createTime,
        t_moment.updateTime AS updateTime,
        JSON_OBJECT(
          'id', t_user.id,
          'username', t_user.username,
          'email', t_user.email,
          'avatarUrl', t_user.avatarUrl
        ) AS 'user',
        (
          SELECT
            JSON_OBJECT(
              'totalCount', COUNT(*),
              'list', JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id', t_comment.id,
                  'user', JSON_OBJECT(
                      'id', t_user.id,
                      'username', t_user.username,
                      'email', t_user.email,
                      'avatarUrl', t_user.avatarUrl
                  ),
                  'content', t_comment.content,
                  'createTime', t_comment.createTime,
                  'updateTime', t_comment.updateTime
                )
              )
            )
          FROM t_comment
          LEFT JOIN t_user ON t_comment.userId = t_user.id
          WHERE t_comment.momentId = t_moment.id && t_comment.commentId IS NULL
        ) AS 'comment',
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', t_label.id,
              'name', t_label.name
            )
          )
          FROM t_moment AS tm -- 取个别名，避免跟外层查询冲突
          LEFT JOIN t_moment_label ON tm.id = t_moment_label.momentId
          LEFT JOIN t_label ON t_moment_label.labelId = t_label.id
          WHERE tm.id = t_moment.id -- 关联外层查询的 t_moment.id，就知道这个内层嵌套查询语句到底要查哪条动态的标签了
          GROUP BY tm.id
      ) AS 'labelList'
      FROM t_moment
      LEFT JOIN t_user ON t_moment.userId = t_user.id
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

  // 这里用一下事务，确保所有标签都添加成功，我们才给客户端返回成功，写入期间任意一个标签添加失败，我们都视作失败
  async addLabel(momentId, labelIdList) {
    const connection = await connectionPool.getConnection();
    try {
      await connection.beginTransaction();

      const statement = `
        INSERT INTO t_moment_label (momentId, labelId) VALUES (?, ?);
      `;
      for (const labelId of labelIdList) {
        await connection.execute(statement, [momentId, labelId]);
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = new MomentRepository();
