// webpack默认情况下只能对.js文件进行处理和打包
// 而对.css文件和.less文件、图片文件、.vue文件等需要用不同的loader来处理后才能打包，没有loader直接打包的话会报错

// 第一步：现在不需要再安装loader了
// 之前打包图片也是通过loader来处理的，但是现在webpack内置了对图片等文件的处理，所以不需要再安装loader了，直接去执行第二步配置即可

// 第二步：给项目配置打包图片
// 去webpack打包配置文件————webpack.config.js————里配置一下打包图片文件

// 第三步：使用webpack对项目打包
// cd到项目根目录下，执行“npm run build”即可