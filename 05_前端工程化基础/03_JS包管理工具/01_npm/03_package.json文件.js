/*
  1、package.json文件是我们项目的配置文件，里面记录着我们项目的很多信息
  实际开发中，我们都会在项目的根目录下创建一个package.json文件（见npm_demo02）：cd到项目的根目录，执行命令“npm init --yes”或“npm init -y”来为项目创建一个package.json文件，init代表初始化项目，--yes和-y代表package.json文件里全部采用默认值
*/

// 2、package.json文件必须是一个标准的json文件，所以里面不能写注释，我们把注释写在这里
const packageJson = {
  // 项目的名字
  "name": "npm_demo02",
  // 项目的版本号
  "version": "1.0.0",
  // 项目的描述
  "description": "这是一个npm的demo项目",
  // 项目是否是私有的
  // 我们在公司里开发的项目都是私有的，我们自己的开源项目可以是公开的
  // 只要这个值设置为true，那这个包就无法发布到npm registry，这个属性可以防止私有包被意外发布到npm registry
  // 如果我们自己的开源项目想发布到npm registry，那就把这个值设置为false
  "private": true,
  // 项目的作者（开源发布时用到）
  "author": "qwer@qq.com",
  // 项目的开源协议（开源发布时用到）
  "license": "ISC",
  // 项目的关键词（开源发布时用到，在npmjs.org里搜索时会关联）
  "keywords": [],

  // 指定项目的入口文件
  "main": "index.js",
  // 指定项目的一些脚本命令，如运行项目、打包项目等
  // 配置后我们就可以通过”npm run 脚本的key“来执行某个具体的命令了，而不用总是敲那么长的命令
  "scripts": {
    // 配置前我们每次想运行项目都得手动敲“node ./index.js”这么长的命令
    // 配置后我们就可以直接通过“npm run start”来运行项目了
    "start": "node ./index.js",
    // 配置前我们每次想打包项目都得手动敲“webpack xxx.js”这么长的命令
    // 配置后我们就可以直接通过“npm run build”来打包项目了
    "build": "webpack xxx.js"
  },

  // 生产环境和开发环境下，项目所有用到的依赖（三方库、私有库等）
  // 执行“npm install xxx”命令就会把某个库安装到dependencies下
  // 执行“npm install”命令就会把所有的库安装到dependencies下
  "dependencies": {
    "axios": "^1.7.7",
    "dayjs": "^1.11.13"
  },
  // 仅开发环境下，项目所有用到的依赖（三方库、私有库等）
  // 执行“npm install xxx -D”命令就会把某个库安装到devDependencies下
  // 执行“npm install”命令就会把所有的库安装到devDependencies下
  "devDependencies": {
    "webpack": "^5.73.0"
  },
};

// 3、版本管理规范
/*
  版本号一般由四个部分组成：MAJOR、MINOR、PATCH、BUILD

  MAJOR是指主版本号，通常是在有重大更新的时候或者引入了不向下兼容更新的时候才会修改主版本号
  MINOR是指副版本号，增加新功能时修改副版本号
  PATCH是指补丁版本号，修复bug时修改补丁版本号
  BUILD是指构建版本号，通常在内部测试时使用
*/
/*
  "1.7.7"：代表固定版本1.7.7
  "~1.7.7"：代表主版本号和副版本号不变、补丁版本号使用最新的版本，即1.7.x
  "^1.7.7"：代表主版本号不变、副版本号和补丁版本号使用最新的版本，即1.x.x
*/