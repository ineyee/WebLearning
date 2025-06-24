## CORS 是什么

CORS 全称是 Cross-Origin Resource Sharing，翻译过来是跨域资源共享。它是一种基于 http header 的机制，该机制允许给一些源添加白名单，白名单里的源可以访问当前服务器上的资源

## 服务端开启 CORS 怎么实现

* cd 到 node 项目根目录，执行“npm install @koa/cors”
* 在 app 注册其它任何中间件之前，先注册 cors 中间件即可

```js
// ====== 服务端开启 CORS 版 main.js，可以去替换试试 ======

const Koa = require("koa");
const KoaRouter = require("@koa/router");
// 导入 cors 中间件
const cors = require("@koa/cors");

// 源白名单
const allowedOrigins = ["http://127.0.0.1:5500", "http://127.0.0.1:8080"];

const app = new Koa();
app.listen("8000", () => {
  console.log("🚀服务器启动成功🚀");
});

// 在 app 注册其它任何中间件之前，先注册 cors 中间件即可
app.use(
  cors({
    // origin: "*", // 我们也可以允许所有源跨域访问，但实际开发中不建议这么做，最好还是搞白名单
    origin: (ctx) => {
      const requestOrigin = ctx.request.header.origin;
      if (allowedOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }
      // 不在源白名单的不允许跨域
      return false;
    },
    allowHeaders: ["Content-Type", "Authorization"], // 允许的请求头
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 允许的 HTTP 方法
    credentials: true, // 是否允许 Cookie 也能跨域访问
  })
);

// 编写一个接口供前端调用
const router = new KoaRouter({
  prefix: "/moment",
});
router.get("/getMomentList", (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: "success",
    data: [
      { id: 1, content: "这是第一条动态" },
      { id: 2, content: "这是第二条动态" },
      { id: 3, content: "这是第二条动态" },
    ],
  };
});
app.use(router.routes());
app.use(router.allowedMethods());
```

