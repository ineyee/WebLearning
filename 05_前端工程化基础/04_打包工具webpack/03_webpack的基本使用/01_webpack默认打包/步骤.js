// 假设我们要对“your_project”项目进行打包，这里使用webpack的默认打包

// 第一步：给“your_project”项目安装webpack
// cd到项目的根目录，执行“npm install webpack webpack-cli -D”命令
// webpack和webpack-cli就会被安装到项目的node_modules文件夹下了

// 第二步：使用webpack打包
// cd到项目的根目录，执行“npx webpack”命令
// webpack就会帮我们打包项目了，注意：
// 1、“npx webpack”命令会找项目的默认入口文件index.js————即”./src/index.js“，所以如果项目的入口文件名不是”index.js“是无法打包的（当然我们可以修改入口文件，这里先不修改）
// 2、打包成功后，webpack会在项目的根目录下默认创建一个名为“dist”的文件夹和一个名为”main.js“的文件（dist是distribution发布的缩写，当然我们也可以修改产物的输出目录和输出文件名，这里先不修改），打包的产物就都放在这个目录下了，我们将来部署到服务器上的东西就是它们了
// 
// 我们安装npm的时候，npx也会默认被安装
// npx是一个工具，告诉命令行优先从当前目录下查找webpack来打包，如果当前目录下没有webpack再去查找全局webpack