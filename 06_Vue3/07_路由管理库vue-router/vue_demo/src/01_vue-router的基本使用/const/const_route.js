import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

/*
  非路由懒加载和路由懒加载：
  * 当我们使用“import from”的方式导入组件来配置路由时，这些组件在打包时不会分包，都会打在同一个文件里，那用户在访问我们的网页时就必须一次性把所有组件的资源都下载下来才能展示首页，这样首屏渲染速度就非常慢
  * 当我们使用“import函数”的方式导入组件来配置路由时，这些组件在打包时会分包，不会打在同一个文件里，那用户在访问我们的网页时就只需要把首页的资源下载下来就能很快看到首页，而其它组件的资源只有在用户真正访问相应的组件才会下载，这就是路由懒加载，实际开发中我们总是使用路由懒加载
*/
// 非路由懒加载
// import Downloads from "../components/Downloads.vue";
// import Products from "../components/Products.vue";
// import Solutions from "../components/Solutions.vue";
// import Partners from "../components/Partners.vue";
// import Resource from "../components/Resource.vue";
// import Company from "../components/Company.vue";
// 路由懒加载
const Downloads = () => import("../components/Downloads.vue");
const Products = () => import("../components/Products.vue");
const Solutions = () => import("../components/Solutions.vue");
const Partners = () => import("../components/Partners.vue");
const Resource = () => import("../components/Resource.vue");
const Company = () => import("../components/Company.vue");

// 1、配置路由并导出
// router是路由管理器，可以进行push路由、获取路由参数等操作
// route是路由，每个路由都有自己的路径path和组件component
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
    { path: "/", redirect: "/products" },
    // 其它路由
    // “/products”是根路径下的products路径
    { path: "/products", component: Products },
    { path: "/solutions", component: Solutions },
    { path: "/downloads", component: Downloads },
    { path: "/partners", component: Partners },
    { path: "/resource", component: Resource },
    { path: "/company", component: Company },
  ],
});
export default router;