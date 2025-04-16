// 我们的服务器上有很多静态资源，例如：图片、视频、音频、HTML、CSS、JS 等
// 客户端在访问这些静态资源时，需要通过一个 URL 就能直接访问到对应的静态资源，例如:http://localhost:8000/files/xxx.jpg
// 这就需要我们服务端把这些静态资源在服务器上部署一下，否则客户端是无法访问这些静态资源的
// 
// 在 express 中，静态资源部署也非常简单，只需要调用一下 app.use("/静态资源所在的文件夹", express.static("./静态资源所在的文件夹")) 就可以了
// 这样一来整个文件夹下所有的静态资源就都被部署到服务器上了，并且这个方法会自动为这些静态资源设置好请求路径，客户端直接访问就可以了

const express = require("express");
const app = express();
app.listen(8000, () => {
  console.log("🚀服务器启动成功🚀");
});

// 客户端可以通过 http://localhost:8000/images/xxx.jpg 访问图片资源
// 客户端可以通过 http://localhost:8000/audios/xxx.mp3 访问音频资源
// 客户端可以通过 http://localhost:8000/videos/xxx.mp4 访问视频资源
app.use("/images", express.static("./images"));
app.use("/audios", express.static("./audios"));
app.use("/videos", express.static("./videos"));

