const responseSuccess = require("../../config/response/response-success.config");
const commentService = require("../../service/comment/comment.service");

class CommentController {
  async createComment(ctx, next) {
    const { id } = ctx.tokenInfo;
    const { content, momentId, commentId } = ctx.request.body;

    try {
      const result = await commentService.createComment(
        id,
        content,
        momentId,
        commentId
      );

      ctx.body = {
        code: responseSuccess.code,
        message: responseSuccess.message,
        data: {
          id: result.insertId,
        },
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message,
      };
    }
  }
}

module.exports = new CommentController();
