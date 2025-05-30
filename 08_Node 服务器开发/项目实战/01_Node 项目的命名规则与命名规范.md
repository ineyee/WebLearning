一、命名规则如下：
* 只能使用字母、数字、下划线，但是不能以数字开头
* 不能使用关键字

二、命名规范如下：
* 尽量做到见名知意，尽量做到使用正确的英文单词
* 如果英文单词过长，一般使用缩写（取英文单词的前3~4个字母）
-------------------------------------------------------
* 项目名：使用小写字母加中划线来命名，如"node-server"
* 文件夹名：使用小写字母加中划线来命名，如"controllers"、"service"、"middleware"
* 文件名
  * 路由文件：使用小写字母加中划线来命名，后缀为.router.js，如"user.router.js"、"moment.router.js"
  * 控制器文件：使用小写字母加中划线来命名，后缀为.controller.js，如"user.controller.js"、"moment.controller.js"
  * 服务层文件：使用小写字母加中划线来命名，后缀为.service.js，如"user.service.js"、"file.service.js"
  * 中间件文件：使用小写字母加中划线来命名，后缀为.middleware.js，如"auth.middleware.js"、"file.middleware.js"
  * 工具类文件：使用小写字母加中划线来命名，后缀为.utils.js，如"password.utils.js"、"error.utils.js"
  * 配置文件：使用小写字母加中划线来命名，后缀为.config.js，如"database.config.js"
  * 所有其它文件：使用小写字母加中划线来命名，如"app.js"、"main.js"
-------------------------------------------------------
* 类名：使用大驼峰来命名，如"UserController"、"MomentService"
* 变量名/属性名：使用小驼峰来命名，如"userName"、"passwordHash"
* 函数名/方法名：使用小驼峰来命名，如"createUser()"、"handleError()"
* 数据库表名：使用小写字母加下划线来命名，如"user"、"user_avatar"
* 数据库字段名：使用小写字母加下划线来命名，如"user_name"、"create_time"
-------------------------------------------------------
* 常量名：使用大写字母加下划线来命名，如"ERROR_CODES"、"APP_PORT"
* 环境变量：使用大写字母加下划线来命名，如"NODE_ENV"、"DB_PASSWORD"
-------------------------------------------------------
