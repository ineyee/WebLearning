const connectionPool = require("../../database.js");

class CommentRepository {
  async createComment(userId, content, momentId, commentId) {
    var statement;
    var result;

    if (momentId) {
      // 代表是个针对动态的评论
      statement = `
        INSERT INTO
        t_comment
        (content, userId, momentId)
        VALUES
        (?, ?, ?);
      `;
      const [r] = await connectionPool.execute(statement, [
        content,
        userId,
        momentId,
      ]);
      result = r;
    } else if (commentId) {
      // 代表是个针对评论的评论
      statement = `
        INSERT INTO
        t_comment
        (content, userId, commentId)
        VALUES
        (?, ?, ?);
      `;
      const [r] = await connectionPool.execute(statement, [
        content,
        userId,
        commentId,
      ]);
      result = r;
    }

    return result;
  }
}

module.exports = new CommentRepository();
