const commentRepository = require("../../repository/comment/comment.repository");

class CommentService {
  async createComment(userId, content, momentId) {
    const result = await commentRepository.createComment(
      userId,
      content,
      momentId
    );
    return result;
  }

  async replyComment(userId, content, momentId, commentId) {
    const result = await commentRepository.replyComment(
      userId,
      content,
      momentId,
      commentId
    );
    return result;
  }
}

module.exports = new CommentService();
