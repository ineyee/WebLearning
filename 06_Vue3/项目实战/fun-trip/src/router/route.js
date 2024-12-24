// 路由路径/路由名
// 
// Flutter里我们是通过类来管理常量字符串的
// 但是JS里的对象太灵活了，它很轻量、直观，且满足了大多数常量管理的需求
// 所以如果不涉及方法、逻辑或继承，直接使用对象而不是类来管理常量是更简洁和合适的选择
const routePath = {
  // 根路径
  root: "/",

  // 首页
  home: "/home",

  // 收藏
  favor: "/favor",

  // 订单
  order: "/order",

  // 消息
  message: "/message",
};

// 路由组件
const routeComponent = {
  // 首页
  home: () => import("../home/page/home-page.vue"),

  // 收藏
  favor: () => import("../favor/page/favor-page.vue"),

  // 订单
  order:  () => import("../order/page/order-page.vue"),

  // 消息
  message: () => import("../message/page/message-page.vue"),
};

// 路由表
export const routes = [
    // 默认路由，即用户访问根路径“/”时的路由，我们一般都是给它重定向到我们第一个想要展示的路由
    // “http://localhost:8081”是协议 + 域名 + 端口号，“http://localhost:8081/”是访问根路径
    // 用户在浏览器里输入“http://localhost:8081”时，其实浏览器会默认在后面拼接上”/“来访问根路径
    // “/”是根路径
    { path: routePath.root, redirect: routePath.home },
    // 其它路由
    // “/products”是根路径下的products路径
    // 当我们使用“import函数”的方式导入组件来配置路由时，这些组件在打包时会分包，不会打在同一个文件里，那用户在访问我们的网页时就只需要把首页的资源下载下来就能很快看到首页，而其它组件的资源只有在用户真正访问相应的组件才会下载，这就是路由懒加载，实际开发中我们总是使用路由懒加载
    { path: routePath.home, component: routeComponent.home },
    { path: routePath.favor, component: routeComponent.favor },
    { path: routePath.order, component: routeComponent.order },
    { path: routePath.message, component: routeComponent.message },
];