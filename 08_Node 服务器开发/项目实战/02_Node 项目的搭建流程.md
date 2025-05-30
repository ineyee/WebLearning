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
├─src/
│  ├─main.js（项目的入口文件）
│  ├─app.js（服务器实例）
│  ├─config/（项目里的配置统一放到这个文件夹里，如常量避免硬编码）
│  │  ├─xxx.config.js（某个模块的配置）
│  ├─router/（项目里路由配置相关的东西都放到这个文件夹里）
│  │  ├─xxx.router.js（某个模块的接口）

## 第六步：准备好服务器需要的一些配置
server.config.js 添加一下配置

## 第七步：在 app.js 文件里基于 koa 框架创建 app
在单独的模块 app.js 里创建 app，在 main.js 文件里使用 app，避免 app 不断追加中间件变得很大时导致 main.js 文件也变得臃肿。就像我们在 Vue 开发和 Flutter 开发里那样，main 里面只是在简洁地使用  App，App 本身是在单独的文件里的

## 第八步：在 main.js 文件里导入 app 并启动服务器
main.js 文件里只做两件事：
  * 导入 app——即 koa 服务器实例
  * 启动服务器

## 第九步：路由管理配置
接下来就是开发每个模块对应的接口了，这里以用户模块为例
  * 在 router 文件夹下创建一个 user.router.js 文件
  * 在 user.router.js 文件里编写路由逻辑并导出路由
  * 在 app.js 里导入路由中间件并注册
