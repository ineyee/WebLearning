import { createRouter, createWebHashHistory } from "vue-router";
import { routes} from "./route.js";

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
  routes: routes,
});

// 2、导出路由
export default router;