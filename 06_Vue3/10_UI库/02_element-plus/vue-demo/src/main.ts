import { createApp } from "vue";
import App from "./App.vue";

// CSS样式置位
import "normalize.css";
import "./asset/css/index.less";

const app = createApp(App);

app.mount("#app");

/*
  第一步：安装element-plus这个UI库
  cd到项目根目录，执行“npm install element-plus --save”来安装element-plus这个UI库
*/

/*
  第二步：安装并配置按需导入组件的插件（按需导入组件可以减少包体积）
  cd到项目根目录，执行“npm install unplugin-vue-components unplugin-auto-import -D”来安装按需导入组件的插件

  按官网的配置教程，复制那段代码去vue.config.js（webpack）或vite.config.ts（vite）里配置插件

  一般改完配置文件后得重新运行下项目来保证配置生效

  如果是 JS 项目的话，直接去执行第三步就可以了
  如果是 TS 项目的话，我们会发现安装这两个插件后，项目目录下自动生成了 "auto-imports.d.ts", "components.d.ts" 两个文件，我们需要去 tsconfig.json 或 tsconfig.app.json 文件里的 include 字段里添加这两个文件，否则 TS 编译器不会编译这两个文件
*/

/*
  第三步：使用组件
  完成上面两步后，我们就可以直接在template模板里使用element-plus里的组件了，我们连导入都不用写，插件会自动解析template模板并帮我们自动导入所用到的组件
*/
