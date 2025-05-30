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

## 第五步：修改站点图标和站点标题
1、修改站点图标：直接用我们的图标替换掉public文件夹里的”favicon.ico“图标即可
2、修改站点标题：public文件夹 -> index.html文件 -> head元素 -> title元素，修改文本内容为我们的标题即可

## 第六步：项目目录结构划分
├─src/
│  ├─main.js
│  ├─App.vue
│  ├─asset/(项目里图片、字体、音频、视频、全局css样式等纯静态资源)
│  │  ├─image/
│  │  ├─font/
│  │  ├─audio/
│  │  ├─video/
│  │  ├─css/
│  ├─component/(项目里比较公用的组件统一放到这个文件夹里，如果是”组件化开发“的话，其实就抽取到base库里的UI库了，项目里不写这个也行)
│  ├─const/(项目里的常量统一放到这个文件夹里，避免硬编码)
│  ├─hook/(项目里多个组件里公用的代码逻辑可以抽取到这个文件夹里，注意是多个组件里)
│  ├─network/(项目里对网络通信相关封装的代码统一放到这个文件夹里，如果是”组件化开发“的话，其实对应base库里的网络库了，项目里不写这个也行)
│  ├─router/(项目里路由配置相关的东西都放到这个文件夹里)
│  │  ├─router.js
│  ├─store/(项目里pinia配置相关的东西、比较公用的store数据放到这个文件夹里)
│  │  ├─store.js
│  ├─util/(项目里比较公用的工具函数代码统一放到这个文件夹里，如果是”组件化开发“的话，其实对应base库里的工具库了，项目里不写这个也行)
│  ├─home/(业务模块一)
│  │  ├─component/(该模块内用到的view)
│  │  ├─model/(该模块内用到的model，不过因为JS里的字典直接就能像对象那样很方便地使用点语法来访问属性，所以很少再把字典转换成model，都是直接使用字典)
│  │  ├─page/(该模块内用到的page)
│  │  ├─service/(该模块的业务层，下层是数据层、上层是视图层，从数据层获取数据并处理成上层能直接使用的数据)
│  │  ├─store/(该模块内用到的view-model)

## 第七步：CSS样式置位 = 重置样式 + 给样式通用默认值
1、normalize.css库：社区总结出来的、常见的需要重置的CSS样式都写在这个库里了，这个库不仅针对Vue项目，React项目和原生项目都可以用这个库来做一下CSS样式重置
  * cd到项目根目录，执行”npm install normalize.css“命令来安装normalize.css库
  * 在main.js里导入normalize.css即可
2、reset.css：我们自定义的重置样式文件
  * 复制reset.css文件到asset/css文件夹下，在index.css里导入reset.css
  * 在main.js里导入index.css即可
3、common.css：我们自定义的通用样式文件
  * 复制common.css文件到asset/css文件夹下，在index.css里导入common.css
  * 在main.js里导入index.css即可

## 第八步：路由管理配置
1、router.js
* 在router文件夹下创建一个router.js文件
* 在router.js文件里配置路由并导出路由
* 在main.js里导入路由并注册

2、使用router-view元素占位，这样将来我们切换路由时，路由对应的组件就会替换出现在router-view元素的位置

3、使用vue-router提供的router对象来切换路由
  * 导入”useRouter()“hook函数并用它创建一个router对象：const router = useRouter();
  * router.push(...)：打开一个新路由，并将其加入到浏览器历史记录中
  * router.back()：返回到浏览器历史记录中的上一页（等价于浏览器的返回按钮）
  * router.forward()：前进到浏览器历史记录中的下一页（等价于浏览器的前进按钮）
  * router.replace()：切换路由时就不是类似“push”的操作，而是类似“pushOff”的操作，用户就无法通过浏览器自带的前进后退来切换到相应的页面了
我们也可以通过手动改变地址栏里的路径来切换路由，组件也会被替换掉，RouterLink元素切换路由的本质就是在改变地址栏里的路径

## 第九步：状态管理配置
* 在store文件夹下创建一个store.js文件
* 在store.js文件里配置pinia并导出
* 在main.js里导入pinia并注册
* 
* 配置好pinia后，后面就是在各个业务模块的文件夹里一个一个创建出来store做业务开发了

## 第十步：移动端适配（Web端不需要做这一步）
1、视口适配：在index.html里按固定写法配置一下即可
2、宽高间距适配、字体大小适配（px单位 => vw单位）
* cd到项目根目录
* 执行”npm install postcss-px-to-viewport -D“命令来安装单位转换的插件
* 手动在项目根目录下创建一个“postcss.config.js”文件
* 去“postcss.config.js”文件里做下固定的配置即可
* 接下来，无论是开发过程中还是打出来的包，单位就都是vw了，当然我们代码里还是继续写死px就行