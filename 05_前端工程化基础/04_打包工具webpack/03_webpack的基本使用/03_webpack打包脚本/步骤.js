// 假设我们要对“your_project”项目进行打包，这里使用webpack打包脚本打包

// 第一步：给“your_project”项目创建package.json文件
// cd到项目的根目录，执行“npm init -y”命令
// package.json文件就会创建出来了（注意：里面指定了项目的默认入口文件index.js————./src/index.js，但我们项目的入口文件却是main.js）

// 第二步：给“your_project”项目安装webpack
// cd到项目的根目录，执行“npm install webpack webpack-cli -D”命令
// webpack和webpack-cli就会被安装到项目的node_modules文件夹下了

// -------------实际开发中，修改入口文件和出口目录、文件一般都是通过修改打包配置文件-------------
// 首先cd到项目的根目录，创建一个名字固定为“webpack.config.js”的文件
// 然后去这个文件里修改打包配置就可以了
// 
// 第三步：使用webpack打包脚本打包
// 每次打包时，我们都得输入”npx webpack“甚至包含各种打包配置更长的打包命令，这也很繁琐
// 因此我们可以在package.json文件里创建一个打包脚本
// 
// 指定项目的一些脚本命令，如运行项目、打包项目等
// 配置后我们就可以通过”npm run 脚本的key“来执行某个具体的命令了，而不用总是敲那么长的命令
// "scripts": {
//   // 当我们使用打包脚本时，这里不需要再写npx了
//   "build": "webpack xxx.js"
// }
// 
// cd到项目的根目录，执行“npm run build”命令
// webpack就会帮我们打包项目了，这样webpack打包时就是找我们自定义的入口文件“main.js”了，并且打包成功后，webpack会在项目的根目录下默认创建一个名为“build”的文件夹和一个名为“your_project_1.0.0_release.js”的文件