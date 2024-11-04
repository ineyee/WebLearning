/*
  1、package.json文件是我们项目的配置文件，里面记录着我们项目的很多信息
  实际开发中，我们都会在项目的根目录下创建一个package.json文件（见npm_demo02）：cd到项目的根目录，执行命令“npm init --yes”或“npm init -y”来为项目创建一个package.json文件，init代表初始化项目，--yes和-y代表package.json文件里全部采用默认值，后续再自己做修改
*/

// 2、package.json文件必须是一个标准的json文件，所以里面不能写注释，我们把注释写在这里
const packageJson = {
  // 项目的名字（必填）
  "name": "npm_demo02",
  // 项目的版本号（必填）
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
    // 三方库
    "axios": "^1.7.7",
    "dayjs": "^1.11.13",
    // 私有库（git和path）
    "base_js_byGit": "git+ssh://git@gitee.com:yourusername/base_js_byGit.git#master",
    "base_js_byPath": "file:/Users/yourusername/Projects/base_js_byPath"
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

  实际开发中，我们建议在package.json文件里不要锁死库的版本，而是使用"^1.7.7"来提供一个宽松范围的版本，原因如下：
  1、可以自动更新某个库到最新的feature版本或bugfix版本，可以帮助我们的项目保持最新状态并修复潜在问题，从而减少我们手动更新版本的维护工作，我们压根不需要管版本的更新问题
  2、当项目依赖较多时，锁死库的版本可能会带来版本冲突问题，比如A库的最新版里依赖了C库的1.2.3版本，B库的最新版里依赖了C库的1.1.1版本，那如果我们写死了C库的版本是其中一个，势必会导致A库或B库无法使用，此时我们就得手动去试A库和B库的某个版本，能够刚好同时使用同一个版本的C库，这是一个很费时的工作，但是如果我们提供宽松范围的C库^1.1.1，那使用A库和B库时就会各自下载所需版本的C库，版本冲突问题根本不会发生
*/

/*
  4、我们需要把package.json文件加入版本控制
  实际开发中，我们需要把package.json文件加入版本控制，主要是为了不把node_modules文件夹加入版本控制，因为node_modules文件夹太大了，大家协作开发时推拉代码都很费事，package.json文件就记录了我们的项目使用了哪些库，大家拉到代码后各自执行“npm install”就可以了
*/