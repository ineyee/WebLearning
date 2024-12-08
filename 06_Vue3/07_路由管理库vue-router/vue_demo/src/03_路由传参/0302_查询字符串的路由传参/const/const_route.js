import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

/*
  路由懒加载：
  * 当我们使用“import from”的方式导入组件来配置路由时，这些组件在打包时不会分包，都会打在同一个文件里，那用户在访问我们的网页时就必须一次性把所有组件的资源都下载下来才能展示首页，这样首屏渲染速度就非常慢
  * 当我们使用“import函数”的方式导入组件来配置路由时，这些组件在打包时会分包，不会打在同一个文件里，那用户在访问我们的网页时就只需要把首页的资源下载下来就能很快看到首页，而其它组件的资源只有在用户真正访问相应的组件才会下载，这就是路由懒加载，实际开发中我们总是使用路由懒加载
*/
const Home = () => import("../components/Home.vue");
const User = () => import("../components/User.vue");
const NotFound = () => import("../components/NotFound.vue")

// 1、配置路由并导出
const router = createRouter({
  /*
    必须指定切换路由时使用的模式
    * createWebHashHistory()：
      * hash模式
      * 当我们切换路由时，地址栏里的路径会有“#”，如“http://localhost:8081/#/products”、“http://localhost:8081/#/solutions”
    * createWebHistory()：
      * history模式
      * 当我们切换路由时，地址栏里的路径不会有“#”，如“http://localhost:8081/products”、“http://localhost:8081/solutions”
  */
  history: createWebHashHistory(),
  // 路由表
  routes: [
    // 默认路由，即用户访问根路径“/”时的路由，我们一般都是给它重定向到我们第一个想要展示的路由
    // “http://localhost:8081”是协议 + 域名 + 端口号，“http://localhost:8081/”是访问根路径
    // 用户在浏览器里输入“http://localhost:8081”时，其实浏览器会默认在后面拼接上”/“来访问根路径
    // “/”是根路径
    { path: "/", redirect: "/home" },
    // 其它路由
    // “/products”是根路径下的products路径
    // 这是个静态路由，也就是说当url为“http://localhost:8081/home”时，对应的路由为Home
    { path: "/home", component: Home },
    { path: "/user/", component: User },
    // “pathMatch(.*)”就是vue-router自带的一个动态路由属性，它的意思是当匹配不到路由表里的任何一个路由时，就来匹配这个路由，实际开发中我们一般都会写这么一个动态路由，来给用户展示路径错误的提示
    { path: "/:pathMatch(.*)", component: NotFound },
  ],
});
export default router;