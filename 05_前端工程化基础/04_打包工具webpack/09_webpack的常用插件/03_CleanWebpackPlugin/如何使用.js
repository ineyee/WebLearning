// 我们编写完代码，代码完毕后，可能又删除了某些不用的文件，重新打包，但是如果我们不手动删除原来的输出目录重新生成，那我们源码里被删掉的东西还是会存在于输出目录里的，但是如果每次执行重打包时我们都要手动删除一下输出目录也很繁琐，所以可以用CleanWebpackPlugin来帮我们，它就会在每次打包的时候自动删掉输出目录，这样重新打包后就会生成一份完全崭新的目录了

// 第一步：为项目安装CleanWebpackPlugin插件
// cd到项目的根目录，执行“npm install clean-webpack-plugin -D”
// clean-webpack-plugin就会被安装到项目的node_modules文件夹下了

// 第二步：为项目配置CleanWebpackPlugin插件
// 去webpack.config.js文件里去配置即可