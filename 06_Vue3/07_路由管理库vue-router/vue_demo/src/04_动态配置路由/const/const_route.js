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
  // 实际开发中，我们在遇到那些需要根据用户角色的权限来决定哪些模块要展示哪些模块不要展示的需求时，一般有两种做法：
  // 路由一次性全部配置好 + 根据权限显隐跳转菜单：我们可以在路由表里把所有的路由全都一次性配置好，然后在判断到有权限时就显示相应的跳转菜单，没权限时就不显示相应的跳转菜单，实现倒是能实现，但是无论菜单是否隐藏，路由表里肯定是把那些不需要展示的路由也注册了的，所以如果我们在浏览器地址栏里手动输入路由对应的路径，那组件依然是能被访问的，虽然这种概率极低
  // 动态配置路由 + 根据权限显隐跳转菜单：我们可以在路由表里把那些肯定要展示的路由全都配置好，而那些需要检查权限相关的路由先不配置，等获取到用户角色的权限后再决定要不要注册这些路由，这种方式相对更靠谱一些，具体的配置方式其实就是一个addRoute()方法，只需要记住这个方法就可以了，实际开发中我们用不到删除路由的方法，因为都是让用户退出登录然后重新登录，只要重新登录就会重新走路由表配置、重新读取角色权限来看是否要把特殊权限组件add进去，不会出现需要删除路由的情况
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
    /*
      但实际开发中我们经常会遇到路径不能写死的情况，比如说用户模块，我们一般不是当用url为“http://localhost:8081/user”时，才对应路由User，而是要在路径里体现出来用户的id之类的东西，比如说url为“http://localhost:8081/user/2487407179”、“http://localhost:8081/user/2487407178”等时，都对应路由User，此时就得用到动态路由

      动态路由就是在静态路由的后面再加上一层路径“/”，然后紧跟一个动态属性“:属性名”，结合起来就是“/:属性名”
    */
    { path: "/user/:id", component: User },
    // “pathMatch(.*)”就是vue-router自带的一个动态路由属性，它的意思是当匹配不到路由表里的任何一个路由时，就来匹配这个路由，实际开发中我们一般都会写这么一个动态路由，来给用户展示路径错误的提示
    { path: "/:pathMatch(.*)", component: NotFound },
  ],
});

// 假设我们这里是从服务器请求到的用户角色权限
const isAdmin = true;
// const isAdmin = false;
if (isAdmin) {
  // 我们可以添加一级路由
  router.addRoute({
    path: "/admin",
    component: () => import("../components/Admin.vue"),
  });

  // 我们也可以添加二级路由
  router.addRoute({
    path: "/admin/superVip",
    component: () => import("../components/AdminSuperVip.vue"),
  });
}

export default router;