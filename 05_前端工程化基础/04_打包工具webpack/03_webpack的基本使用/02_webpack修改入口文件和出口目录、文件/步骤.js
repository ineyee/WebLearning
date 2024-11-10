// 假设我们要对“your_project”项目进行打包，这里修改入口文件和出口目录、文件
// 入口文件改成“main.js”
// 出口目录改成“build”、出口文件改成“your_project_1.0.0_release.js”

// 第一步：给“your_project”项目安装webpack
// cd到项目的根目录，执行“npm install webpack webpack-cli -D”命令
// webpack和webpack-cli就会被安装到项目的node_modules文件夹下了

// ------------------------方式一：通过修改打包命令来修改------------------------
// 第二步：使用webpack打包
// cd到项目的根目录，执行“npx webpack --entry ./src/main.js --output-path ./build --output-filename your_project_1.0.0_release.js”命令
// webpack就会帮我们打包项目了，这样webpack打包时就是找我们自定义的入口文件“main.js”了，并且打包成功后，webpack会在项目的根目录下默认创建一个名为“build”的文件夹和一个名为“your_project_1.0.0_release.js”的文件
// 
// 我们安装npm的时候，npx也会默认被安装
// npx是一个工具，告诉命令行优先从当前目录下查找webpack来打包，如果当前目录下没有webpack再去查找全局webpack

// ------------------------方式二：通过修改打包配置文件来修改------------------------
// 上面的打包命令又臭又长，我们每次打包时如果输入这么长的东西肯定很麻烦，所以我们一般都是通过修改打包配置文件的方式
// 首先cd到项目的根目录，创建一个名字固定为“webpack.config.js”的文件
// 然后去这个文件里修改打包配置就可以了
// 
// 第二步：使用webpack打包
// cd到项目的根目录，执行“npx webpack”命令
// webpack就会自动去找根目录下的”webpack-config.js“文件里读取打包配置帮我们打包项目了，这样webpack打包时就是找我们自定义的入口文件“main.js”了，并且打包成功后，webpack会在项目的根目录下默认创建一个名为“build”的文件夹和一个名为“your_project_1.0.0_release.js”的文件
// 
// 我们安装npm的时候，npx也会默认被安装
// npx是一个工具，告诉命令行优先从当前目录下查找webpack来打包，如果当前目录下没有webpack再去查找全局webpack