const KoaRouter = require("@koa/router");
const { verifyToken } = require("../../middleware/user/user.middleware");
const labelController = require("../../controller/label/label.controller");

const router = new KoaRouter({
  prefix: "/label",
});

// 新增标签
// 得验证登录身份
router.post("/createLabel", verifyToken, labelController.createLabel);

module.exports = router;

/*
一条动态可以有多个标签、一个标签也可以属于多条动态，所以动态表和标签表是多对多的关系，动态表是主表，标签表是主表，我们再引入一个中间表


标签表
```SQL
CREATE TABLE IF NOT EXISTS t_label (
  -- 主键、自增
  id BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 该字段我们定义为必传，即 String 类型而非 String? 类型，因此我们不需要提供默认值，该字段还得唯一
  name VARCHAR(100) NOT NULL UNIQUE,

  -- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	createTime TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
	
	-- 该字段我们定义为必传，即 TIMESTAMP 类型而非 TIMESTAMP? 类型，因此我们需要提供默认值
	updateTime TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP
);
```

中间表
```SQL
CREATE TABLE IF NOT EXISTS `t_moment_label` (
  -- 主键、自增
  id BIGINT PRIMARY KEY AUTO_INCREMENT,

  -- 必须与 t_moment.id 类型一致
  momentId BIGINT,

  -- 必须与 t_label.id 类型一致
  labelId BIGINT,

  -- 在 CREATE 语句的最后添加一个外键约束
  FOREIGN KEY (momentId) REFERENCES t_moment(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (labelId) REFERENCES t_label(id) ON UPDATE CASCADE ON DELETE CASCADE
);
```
*/
