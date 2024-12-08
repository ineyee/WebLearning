import { createApp } from 'vue';

// import App from './01_vue-router的基本使用/App.vue';
// import ConstRoute from './01_vue-router的基本使用/const/const_route.js';

import App from "./02_路由的嵌套使用/App.vue";
import ConstRoute from "./02_路由的嵌套使用/const/const_route.js"

// import App from './03_动态路由/App.vue';
// import ConstRoute from './03_动态路由/const/const_route.js'

const app = createApp(App);
// 2、在App启动的地方导入路由并注册
app.use(ConstRoute);
app.mount('#app');

/*
  Web开发里的单页面应用SPA和Vue里的路由管理库vue-router

  1、是什么？
  单页面应用SPA的英文全称是Single Page Application，所谓单页面是指整个应用从头至尾只有一个HTML页面，也就是说整个应用只在第一次打开的时候加载一次HTML文件，后续页面发生任何变化都通过JS更新DOM实现，绝对不会再加载其它HTML文件。注意这里的单页面是指“一个HTML页面”，跟浏览器里的“一个标签页”没有任何关系，浏览器的同一个标签页里我们依然可以实现多页面应用开发————即页面发生变化时我们就在当前标签页内完全加载另一个HTML文件

  2、为什么？
  单页面应用SPA的最大优势就是页面切换时不是执行类似刷新网页的效果————重新加载整个网页，而是仅仅替换其中的某些组件，因此用户体验会更流畅

  3、怎么办？
  Vue里的路由管理库vue-router就是用来做单页面应用SPA的路由管理的，路由管理的本质其实就是将路径和组件给形成映射关系，然后路径的变化就对应着组件的变化
  这里我们先安装一下vue-router，cd到项目根目录，执行“npm install vue-router”，不要加“-g”、因为这个库是仅供我们项目使用的、不需要全局安装，不要加“-D”、因为这个库在开发环境和发布环境都得使用、不能说网页上线了用户不能切换页面吧
*/