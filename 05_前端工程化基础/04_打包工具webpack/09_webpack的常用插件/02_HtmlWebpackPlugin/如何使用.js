// 我们知道web的三大组成部分是HTML、CSS、JS，前面我们已经学习了用webpack来打包CSS和JS，那HTML呢？
// HTML一般是轻量的静态文件，不包含复杂的依赖和逻辑。因此，通常无需用webpack来打包，实际开发中一般都是用HtmlWebpackPlugin插件来对HTML文件进行优化处理——比如压缩HTML文件的体积来减少页面的加载时间等

// 第一步：为项目安装HtmlWebpackPlugin插件
// cd到项目的根目录，执行“npm install html-webpack-plugin -D”
// html-webpack-plugin就会被安装到项目的node_modules文件夹下了

// 第二步：为项目配置HtmlWebpackPlugin插件
// 去webpack.config.js文件里去配置即可
// 这样webpack打包时就会根据相应的模板为我们生成并压缩HTML文件了
// webpack打包好的JS文件会注入到模版HTML文件中展示