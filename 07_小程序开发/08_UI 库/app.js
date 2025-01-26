// app.js
App({

})

// Vant 小程序版：https://vant-ui.github.io/vant-weapp/#/home

/*
  第一步：安装vant这个UI库
  cd到项目根目录，执行“npm install @vant/weapp”来安装vant这个UI库
  安装完成后，项目目录里就自动生成了我们非常熟悉的 node_modules 文件夹、package.json 文件、package-lock.json 文件
*/

/*
  第二步：小程序里就不需要安装并配置按需导入组件的插件了（按需导入组件可以减少包体积）
  小程序里使用组件都是在相应的 usingComponents 里注册，所以：
  * 如果仅仅是在某个界面里使用某个组件，那就只在那个界面的 usingComponents 里注册
  * 如果项目里很多地方都要使用某个组件，那就在 app.json 的 usingComponents 里注册
*/

/*
  第三步：修改 app.json
  将 app.json 中的 "style": "v2" 去除，小程序的新版基础组件强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱
*/

/*
  第四步：构建 npm 包（每次用 npm 安装一个三方库后都得执行一次构建 npm 包这个操作）
  IDE 菜单栏 - 工具 -> 构建 npm
  构建完成后，项目目录里就自动生成了一个 miniprogram_npm 文件夹，其实就是把 node_modules 文件夹里三方库搬到了 miniprogram_npm 文件夹里，小程序框架找三方库不是从 node_modules 文件夹里找而是从 miniprogram_npm 文件夹里找
*/

/*
  第五步：使用组件
  完成上面几步后，我们就可以直接在 WXML 里使用 vant 里的组件了
*/
