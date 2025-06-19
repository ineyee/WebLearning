const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const commentController = require("../../controller/comment/comment.controller");

const router = new KoaRouter({
  prefix: "/comment",
});

// 发布评论
// 得验证登录身份
router.post("/createComment", verifyToken, commentController.createComment);
// 回复评论
router.post("/replyComment", verifyToken, commentController.replyComment);

module.exports = router;

/*
评论表
* 一条评论下可以有多条回复型评论、一条回复型评论只能属于一条评论，所以评论表和评论表本身是一对多的关系，评论表是一、主表，评论表是多、从表

```SQL
CREATE TABLE IF NOT EXISTS t_comment (
  -- 主键、自增
  id BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值，该字段还得唯一
  content VARCHAR(1000) NOT NULL,
	
	-- 必须与 t_user.id 类型一致，代表是谁发表的评论
  userId BIGINT NOT NULL,
	
	-- 必须与 t_moment.id 类型一致，代表是针对哪条动态发表的评论
	momentId BIGINT NOT NULL,
	
	-- 必须与 t_comment.id 类型一致，代表是针对某条动态下的评论所回复的评论，为空时就代表某条动态下的评论没有其它回复（外键可以指向当前表自己）
	commentId BIGINT,

  -- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	createTime TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
	
	-- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	updateTime TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	
  -- 在 CREATE 语句的最后添加一个外键约束，含义为：
  -- 当前表中的外键 `userId`，引用的是 `t_user` 表中的 `id`
  -- ON UPDATE 和 ON DELETE 是指当我们删除或修改 t_user.id 时，t_moment 应该做出什么反应，默认情况下是这个值是 RESTRICT —— 即如果某个字段被外键关联着、那么在删除或修改这个字段时直接报错、也就是说不允许删除或修改；我们通常会手动设置为 CASCADE —— 即允许删除或修改这个字段、并且如果是删除这个字段那就跟随删除另外一张表里的数据、如果是修改这个字段那就跟随修改另外一张表里的数据
  FOREIGN KEY (userId) REFERENCES t_user(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (momentId) REFERENCES t_moment(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (commentId) REFERENCES t_comment(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
*/
