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
    { path: "/login", component: () => import("../components/Login.vue") },
    /*
      但实际开发中我们经常会遇到路径不能写死的情况，比如说用户模块，我们一般不是当用url为“http://localhost:8081/user”时，才对应路由User，而是要在路径里体现出来用户的id之类的东西，比如说url为“http://localhost:8081/user/2487407179”、“http://localhost:8081/user/2487407178”等时，都对应路由User，此时就得用到动态路由

      动态路由就是在静态路由的后面再加上一层路径“/”，然后紧跟一个动态属性“:属性名”，结合起来就是“/:属性名”
    */
    { path: "/user/:id", component: User },
    // “pathMatch(.*)”就是vue-router自带的一个动态路由属性，它的意思是当匹配不到路由表里的任何一个路由时，就来匹配这个路由，实际开发中我们一般都会写这么一个动态路由，来给用户展示路径错误的提示
    { path: "/:pathMatch(.*)", component: NotFound },
  ],
});

/*
  实际开发中，我们可能需要在跳转到某个界面之前进行一些检测，满足条件才跳过去，否则就不跳过去，这就要用到路由导航守卫，vue-router在进行每次路由跳转前都会触发一个函数————beforeEach()
  例如：用户在点击跳转到购物车界面、个人中心时，我们都会先判断下用户是否登录了，如果登录了则放行，否则跳转到登录界面
*/
// 假设我们这里是从本地读取到的用户登录状态
// const isLogin = true;
const isLogin = false;
router.beforeEach((to, from) => {
  console.log(`原路由: ${from.path} 要跳转到的路由: ${to.path}`);

  if (isLogin === false && to.path.startsWith("/user")) {
    // 不是动态路由时，直接判等就行：to.path === "/user"
    // 返回相应的路径，就会拦截本次导航并跳转到相应的组件
    return "/login";
  }

  // 不写return或者return null或者return undefined，就是默认的跳转
  // return null;
});

export default router;