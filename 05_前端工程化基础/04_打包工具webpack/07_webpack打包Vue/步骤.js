// webpack默认情况下只能对.js文件进行处理和打包
// 而对.css文件和.less文件、图片文件、.vue文件等需要用不同的loader来处理后才能打包，没有loader直接打包的话会报错

// 第一步：给项目安装vue-loader
// cd到项目根目录下，执行”npm install vue-loader -D“
// vue-loader就会被安装到项目的node_modules文件夹下了

// 第二步：给项目配置vue-loader
// 然后再去去webpack打包配置文件————webpack.config.js————里配置一下loader来处理.vue文件

// 第三步：使用webpack对项目打包
// cd到项目根目录下，执行“npm run build”即可