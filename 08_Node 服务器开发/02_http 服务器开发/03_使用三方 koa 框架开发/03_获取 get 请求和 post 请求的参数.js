const Koa = require("koa");
const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
app.listen("8000", () => {
  console.log("🚀服务器启动成功🚀");
});

app.use(bodyParser());

const userRouter = new KoaRouter({
  prefix: "/user",
});
// express 框架内置了 json() 中间件和 urlencoded() 中间件，koa 框架没有，所以我们需要安装一个 koa-bodyparser 的三方库来解析 post 请求的请求体
// * 1、cd 到项目根目录，执行 npm install koa-bodyparser
// * 2、注册一下中间件：app.use(bodyParser())，无论是 json 提交还是表单提交，这一个中间件都会帮我们解析好
// * 3、这个中间件内部就是在解析 post 请求体里的数据，解析成 jsonObj 后，会把 jsonObj 赋值给 request 对象的 body 属性，我们就能拿到 post 请求的请求体了
// 注意：
// * koa-bodyparser 这个中间件在解析完 post 请求的请求体后是把请求体挂在了 Koa 请求对象的 body 属性上，即我们要通过 ctx.request.body 来获取请求体
// * 并没有挂在 Node 原生请求对象的 body 属性上，所以我们不能通过 ctx.req.body 来获取请求体
// * 并且我们前面已经说过 ctx.body 引用的是 ctx.response.body，即 ctx.body 是响应体，用来给客户端返回数据，所以我们也不能通过 ctx.body 来获取请求体
userRouter.post("/login", (ctx, next) => {
  console.log("请求参数：", ctx.request.body);

  if (ctx.request.body.username === "watson" && ctx.request.body.password === "123456") {
    ctx.body = {
      "code": 0,
      "message": "登录成功",
      "data": {
          "token": "1234567890",
        },
    };
  } else {
    ctx.body = {
      "code": 1000,
      "message": "登录失败",
      "data": {
        "msg": "请检查用户名或密码是否正确",
      },
    };
  }
});

const songRouter = new KoaRouter({
  prefix: "/song",
});
// koa 框架内部已经自动完成了 get 请求的请求参数解析，我们只需要使用 ctx.query 这个 jsonObj 就可以了，也不需要再使用别的中间件
songRouter.get("/list", (ctx, next) => {
  console.log("请求参数：", ctx.query);
  ctx.body = {
    "code": 0,
    "message": "获取歌单成功",
    "data": {
      "id": ctx.query.id,
      "page": ctx.query.page,
      "size": ctx.query.size,
    },
  };
});

app.use(userRouter.routes());
app.use(songRouter.routes());