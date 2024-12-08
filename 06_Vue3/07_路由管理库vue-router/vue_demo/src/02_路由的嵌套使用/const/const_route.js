import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

// 路由懒加载
const Downloads = () => import("../components/Downloads.vue");
const Products = () => import("../components/Products.vue");
const Solutions = () => import("../components/Solutions.vue");
const Partners = () => import("../components/Partners.vue");
const Resource = () => import("../components/Resource.vue");
const Company = () => import("../components/Company.vue");

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
    { path: "/", redirect: "/products" },
    // 其它路由
    // “/products”是根路径下的products路径
    // 这是一级路由，假设我们在上面下面还有二级路由，比如“http://localhost:8081/products/memPod”这种
    {
      path: "/products",
      component: Products,
      // 路由的嵌套使用也很简单，我们只需要在相应的父路由里写子路由即可
      children: [
        // 如果我们期望用户访问“http://localhost:8081/products”这个一级路由时能默认打开二级路由“hearingAids”的话，也可以做下重定向
        {
          path: "/products",
          redirect: "/products/hearingAids", // 重定向时得写全路径
        },
        {
          path: "/products/hearingAids", // 我们可以主动地写全子路由的路径
          component: () => import("../components/ProductHearingAids.vue"),
        },
        {
          path: "memPod", // 也可以采用省略的写法（注意前面不能加“/”），vue-router会自动补全为“/products/memPod”
          component: () => import("../components/ProductMemPod.vue"),
        },
        {
          path: "frame",
          component: () => import("../components/ProductFrame.vue"),
        },
      ],
    },
    { path: "/solutions", component: Solutions },
    { path: "/downloads", component: Downloads },
    { path: "/partners", component: Partners },
    { path: "/resource", component: Resource },
    { path: "/company", component: Company },
  ],
});
export default router;