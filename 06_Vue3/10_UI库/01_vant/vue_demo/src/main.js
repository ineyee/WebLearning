import { createApp } from 'vue'
import App from './App.vue'

// 导入全局 CSS
import "./css/common.css"

createApp(App).mount('#app')

/*
  第一步：安装vant这个UI库
  cd到项目根目录，执行“npm install vant”来安装vant这个UI库
*/

/*
  第二步：安装并配置按需导入组件的插件（按需导入组件可以减少包体积）
  cd到项目根目录，执行“npm i @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D”来安装按需导入组件的插件

  按官网的配置教程，复制那段代码去vue.config.js里配置插件

  一般改完配置文件后得重新运行下项目来保证配置生效
*/

/*
  第三步：使用组件
  完成上面两步后，我们就可以直接在template模板里使用vant里的组件了，我们连导入都不用写，插件会自动解析template模板并帮我们自动导入所用到的组件
*/