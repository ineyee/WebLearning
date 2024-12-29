import { createRouter, createWebHashHistory } from "vue-router";

// 1、配置路由
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
    { path: "/", redirect: "/home" },
    // 其它路由
    // “/products”是根路径下的products路径
    // 当我们使用“import函数”的方式导入组件来配置路由时，这些组件在打包时会分包，不会打在同一个文件里，那用户在访问我们的网页时就只需要把首页的资源下载下来就能很快看到首页，而其它组件的资源只有在用户真正访问相应的组件才会下载，这就是路由懒加载，实际开发中我们总是使用路由懒加载
    {
      path: "/home",
      component: () => import("../home/page/home-page.vue"),
      meta: {
        showTabBar: true,
      },
    },
    { path: "/cityPage", component: () => import("../home/page/city/city_page.vue") },

    {
      path: "/favor",
      component: () => import("../favor/page/favor-page.vue"),
      meta: {
        showTabBar: true,
      },
    },
    {
      path: "/order",
      component: () => import("../order/page/order-page.vue"),
      meta: {
        showTabBar: true,
      },
    },
    {
      path: "/message",
      component: () => import("../message/page/message-page.vue"),
      meta: {
        showTabBar: true,
      },
    },
  ],
});

// 2、导出路由
export default router;