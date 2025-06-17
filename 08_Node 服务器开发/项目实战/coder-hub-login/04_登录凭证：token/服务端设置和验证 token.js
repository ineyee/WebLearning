const fs = require("fs");
const Koa = require("koa");
const KoaRouter = require("@koa/router");
// 安装并导入 jsonwebtoken 库
const jwt = require("jsonwebtoken");

// 把私钥和公钥加载到项目中
const privateKey = fs.readFileSync("./keys/private_key.pem");
const publicKey = fs.readFileSync("./keys/public_key.pem");

const app = new Koa();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

const router = new KoaRouter({ prefix: "/user" });
router.post("/login", (ctx, next) => {
  // 假设这里服务端判断到登录接口走成功...

  /*
    服务端生成 token
      * payload：携带的业务信息，将来其它接口验证 token 时可以通过业务信息决定是哪个用户
      * privateKey：私钥
      * options
        * expiresIn：过期时间（单位秒）
        * algorithm：RS256 非对称加密算法
  */
  const token = jwt.sign({ email: "kobe@gmail.com" }, privateKey, {
    expiresIn: 30 * 24 * 60 * 60,
    algorithm: "RS256",
  });

  // 服务端给客户端返回 token
  ctx.body = {
    code: 0,
    message: "登录成功",
    data: {
      token: token,
    },
  };
});
router.get("/info", (ctx, next) => {
  const token = ctx.headers.token;

  try {
    /*
      服务端验证 token
        * token
        * publicKey
        * options
          * algorithm：RS256 非对称加密算法
      
      验证的返回值里有生成 token 时挂在的 payload 信息，我们可以进一步拿这个 payload 信息去获取更多的数据返回给客户端
    */
    const result = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    ctx.body = {
      code: 0,
      message: "获取用户信息成功",
      data: {
        email: result.email,
      },
    };
  } catch (error) {
    ctx.body = {
      code: -2000,
      message: "登录凭证无效",
    };
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
