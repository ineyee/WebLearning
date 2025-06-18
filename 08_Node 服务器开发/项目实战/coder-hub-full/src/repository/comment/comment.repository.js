const connectionPool = require("../../database.js");

class CommentRepository {
  async createComment(userId, content, momentId) {
    const statement = `
        INSERT INTO
        t_comment
        (content, userId, momentId)
        VALUES
        (?, ?, ?);
      `;
    const [result] = await connectionPool.execute(statement, [
      content,
      userId,
      momentId,
    ]);

    return result;
  }

  async replyComment(userId, content, momentId, commentId) {
    const statement = `
        INSERT INTO
        t_comment
        (content, userId, momentId, commentId)
        VALUES
        (?, ?, ?, ?);
      `;
    const [result] = await connectionPool.execute(statement, [
      content,
      userId,
      momentId,
      commentId,
    ]);

    return result;
  }
}

module.exports = new CommentRepository();
