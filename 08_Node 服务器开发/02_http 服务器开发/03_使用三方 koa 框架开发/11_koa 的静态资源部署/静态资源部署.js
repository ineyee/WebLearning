// 我们的服务器上有很多静态资源，例如：图片、视频、音频、HTML、CSS、JS 等
// 客户端在访问这些静态资源时，需要通过一个 URL 就能直接访问到对应的静态资源，例如:http://localhost:8000/files/xxx.jpg
// 这就需要我们服务端把这些静态资源在服务器上部署一下，否则客户端是无法访问这些静态资源的
// 
// express 框架里内置了 static() 中间件，koa 里没有，所以我们需要手动安装一个中间件 koa-static
// cd 到项目根目录，执行 npm install koa-static
// 
// 在 koa 中，静态资源部署也非常简单，只需要调用一下 app.use(mount("/静态资源所在的文件夹", static("./静态资源所在的文件夹"))); 就可以了
// 这样一来整个文件夹下所有的静态资源就都被部署到服务器上了，并且这个方法会自动为这些静态资源设置好请求路径，客户端直接访问就可以了

const Koa = require("koa");
const static = require("koa-static");
const mount = require("koa-mount"); // 需要安装：npm install koa-mount

const app = new Koa();

// 客户端可以通过 http://localhost:8000/images/xxx.jpg 访问图片资源
// 客户端可以通过 http://localhost:8000/audios/xxx.mp3 访问音频资源
// 客户端可以通过 http://localhost:8000/videos/xxx.mp4 访问视频资源
// 使用 koa-mount 来指定路径前缀
app.use(mount("/images", static("./images")));
app.use(mount("/audios", static("./audios")));
app.use(mount("/videos", static("./videos")));

app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

