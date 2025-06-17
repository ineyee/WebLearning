## 第一步：创建项目

Node 开发时：
  * 如果我们使用的是 Express 框架来做 http 服务器开发，那么也有一个名字叫做 Express Generator 的脚手架来创建项目，你想把项目创建到哪个目录下，就cd到哪个目录，然后执行“express {项目名}”命令即可（更具体的使用方法可以 deepseek 一把），脚手架也会自动为我们创建一个 package.json 文件
  * 如果我们使用的是 Koa 框架来做 http 服务器开发，那么就没有脚手架来创建项目了（因为 Koa 框架的设计哲学就是极简，很多库都不内置，它啥也不管），你想把项目创建到哪个目录下，就进入该目录，创建一个 {项目名} 的文件夹就是我们的项目了，此时我们还需要自己创建一个 package.json 文件，因为没有谁会帮我们自动生成，创建方式详见“05_前端工程化基础/03_包管理工具npm和pnpm/01_npm/03_package.json文件”

## 第二步：为项目安装必备的三方库

0、先添加一下 gitignore 文件：https://github.com/github/gitignore/blob/main/Node.gitignore

1、koa（http 服务器框架）：cd 到项目根目录，执行命令：npm install koa
  * 此外我们需要知道：koa 跟 express 有一个很大的区别是，express 内置了很多常用的中间件，我们安装完 express 就能直接使用这些中间件了，而 koa 没有内置中间件，我们用到某些中间件时需要手动安装

2、@koa/router（路由管理库）：cd 到项目根目录，执行命令：npm install @koa/router

3、koa-bodyparser（解析 post 请求的请求体库）：cd 到项目根目录，执行命令：npm install koa-bodyparser

4、multer（文件上传库）：cd 到项目根目录，执行命令：npm install @koa/multer multer

5、mysql2（数据库驱动库）：cd 到项目根目录，执行命令：npm install mysql2

6、jsonwebtoken（token 生成和校验库）：cd 到项目根目录，执行命令：npm install jsonwebtoken

## 第三步：删掉项目里默认的多余文件夹和文件，只保留main.js，保证项目的干净
  * 在项目的根目录先先创建一个 src 文件夹，代表我们编写的源码
  * 在 src 文件夹里先创建一个 main.js 文件，代表我们项目的入口文件
  * 在 main.js 文件里先写一条打印语句

## 第四步：把项目跑起来
  * 此时我们就可以 cd 到项目根目录， 用“node ./src/main.js”把项目跑一下，看到打印后就代表项目正常跑起来了
  * 当然为了避免每次跑项目我们都得输入“node ./src/main.js”这么长的命令，我们可以在 package.json 文件里配置一下运行项目的脚本“"start": "nodemon ./src/main.js"”，这样一来用“npm run start”就可以运行项目了
  * 此外为了让服务器能在修改代码后自动更新，我们可以使用 nodemon 工具来运行服务器（记得全局安装 nodemon 工具），所以把运行项目的脚本换成“"start": "nodemon ./src/main.js"”
  "scripts": { 
    "start": "nodemon ./src/main.js"
  },

## 第五步：项目目录结构划分

```
├─src/（我们编写的源文件）
│  ├─main.js（项目的入口文件）
│  ├─app.js（服务器实例）
│  ├─database.js（数据库连接池实例）
│  ├─config/（项目里的配置都放到这个文件夹里，如常量避免硬编码）
│  │  ├─xxx.config.js（某个模块的配置）
│  ├─router/（路由配置）
│  │  ├─xxx.router.js（某个模块接口的请求路径和表现层中间件的映射关系）
│  ├─controller/（表现层）
│  │  ├─xxx.controller.js（某个模块接口的表现层中间件）
│  ├─service/（业务层）
│  │  ├─xxx.service.js（某个模块接口的业务逻辑）
│  ├─repository/（数据层）
│  │  ├─xxx.repository.js（某个模块接口的数据库操作）
│  ├─middleware/（中间件）
│  │  ├─xxx.middleware.js（某个模块接口的中间件，有的中间件类似于 VM 为 Controller 减负、比如“对客户端的请求参数进行基础有效性校验”的中间件）
│  ├─util/（工具函数）
```

`Node 开发也有三层架构：`
* `表现层 ==调用==> 业务层 ==调用==> 数据层`
* `表现层 <==数据== 业务层 <==数据== 数据层`

`表现层（controller）的职责就是直接与客户端打交道，如接收客户端的请求参数、对客户端的请求参数进行基础有效性校验、调用业务层的 API 拿到客户端直接能用 JSON 或 HTML 等数据、给客户端返回响应。换句话说，表现层要对客户端负责，负责的体现就是返回给客户端直接能用的有效数据或错误信息；表现层要对业务层负责，负责的体现就是传递给业务层的参数必须是有效的；其它的表现层就不用关心了。在表现层进行参数的基础有效性校验是为了在请求进入业务逻辑前就拒绝非法格式，避免无效数据渗透到下层，主要包含：必填字段校验、字段长度校验、字段格式校验等，其它跟业务相关的校验就交给业务层去校验`

`业务层（service）的职责就是处理我们实际的业务逻辑，如业务规则校验、数据库事务管理等，业务层内部在调用数据层的 API，等待数据层给它返回 rawData，然后把 rawData 处理成表现层能直接返回给客户端的数据、以便交付给表现层。换句话说，业务层要绝对相信表现层，相信的体现就是直接拿着参数去做业务，而不再纠结于参数会不会出问题，要绝对相信经过表现层校验后的参数是肯定没问题的；业务层要对表现层负责，负责的体现就是交付给表现层的数据必须是直接能用的；其它的业务层就不用关心了`

`数据层（repository）的职责就是直接与数据库打交道，调用数据层你就可以获取到 rawData。换句话说，数据层只需要对自己负责就行，负责的体现就是干好创建 SQL 语句、执行 SQL 语句、获取执行结果、返回执行结果给业务层即可；其它的数据层就不用关心了，至于执行结果失败了怎样、成功了怎样，那是业务层拿到结果后该干的事`

## 第六步：先在数据库 GUI 工具里创建好数据库和表

按照我们的技术设计，先在 Navicat 里创建好数据库和表

## 第七步：准备好项目的一些配置

* config/server.config.js 添加一下服务器的配置
* config/database.config.js 添加一下数据库的配置
* config/response-success.config.js 添加一下响应成功的配置
* config/response-error.config.js 添加一下响应错误的配置

## 第八步：在 app.js 文件里基于 koa 框架创建 app

在单独的模块 app.js 里创建 app + 在 main.js 文件里使用 app，避免 app 不断追加中间件变得很大时导致 main.js 文件也变得臃肿。就像我们在 Vue 开发和 Flutter 开发里那样，main 里面只是在简洁地使用  App，App 本身是在单独的文件里的

## 第九步：在 main.js 文件里导入 app 并启动服务器

main.js 文件里只做两件事：
  * 导入 app——即 koa 服务器实例
  * 启动服务器

## 第十步：在 database.js 文件里基于 mysql2 库创建连接池

* 这里只是先预备好连接池，还没有任何地方导入使用
* 将来各个模块的数据层都需要导入这个文件，通过连接池来访问数据库

## 第十一步：开发接口

`接口请求和响应流程：客户端发起请求 -> router -参数-> controller + 减负 middleware -> service -> repository -数据-> service -> controller -> 给客户端返回响应`

接下来就是开发每个模块对应的接口了（`每个接口都至少对应一个 router、一个 controller、一个 service、一个 dio 这四个东西，还有可能会包含一个 middleware 来为 controller 减负`），这里以用户模块的注册接口为例：

#### 1、在 postman 里设计下注册接口
  * method: post
  * url: http://localhost:8000/user/register
  * params json: email（string 必传且唯一）、username（string 必传）、password（string 必传）

#### 2、注册接口的路由配置
  * 在 router 文件夹下创建一个 user.router.js 文件
  * 在 user.router.js 文件里编写注册接口的请求路径和表现层中间件的映射关系并导出路由
  * 在 app.js 里导入路由并注册路由中间件

#### 3、表现层
  * 在 controller 文件夹下创建一个 user.controller.js 文件
  * 在 user.controller.js 文件里编写表现层应该负责的逻辑
  * 在 user.router.js 里导入表现层中间件并建立跟请求路径的映射关系

#### 4、业务层
  * 在 service 文件夹下创建一个 user.service.js 文件
  * 在 user.service.js 文件里编写业务层应该负责的逻辑
  * 在 user.controller.js 里导入业务层 API 并调用

#### 5、数据层
  * 在 repository 文件夹下创建一个 user.repository.js 文件
  * 在 user.repository.js 文件里编写数据层应该负责的逻辑
  * 在 user.service.js 里导入数据层 API 并调用

#### 6、减负中间件
  * 根据需求创建减负中间件为 Controller 减负

#### 7、工具函数
  * 根据需求创建工具函数

#### 8、在 postman 里测试并导出接口文档
  * 在 postman 里测试接口的各种情况，确保全部通过
  * 导出接口文档交给客户端开发