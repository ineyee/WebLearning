// webpack默认情况下只能对.js文件进行处理和打包
// 而对.css文件和.less文件、图片文件、.vue文件等需要用不同的loader来处理后才能打包，没有loader直接打包的话会报错

// 第一步：给项目安装css-loader、less-loader + style-loader + postcss-loader + postcss-preset-env
// 1、css-loader只负责加载.css文件
// 2、less-loader只负责加载.less文件
// 3、style-loader只负责把加载到的CSS样式插入到HTML页面中（就是我们之前学习的CSS插入到HTML中的三种方式，style-loader默认情况下是通过【内部样式表】的方式来插入的）
// 4、此外我们还可以安装一个loader，那就是postcss-loader，这个loader可以帮我们做诸如判断某些css属性是否需要加浏览器前缀来做兼容、需要的话就自动加前缀等很多事情，很多事情就不用我们自己去做了，比如是否允许用户复制文本的”user-select“CSS属性就存在兼容性问题，得判断是否需要加浏览器前缀，当然postcss-loader还依赖postcss-preset-env这个插件包才能完成这很多事情，所以我们还得安装下postcss-preset-env这个插件包
// 
// cd到项目根目录下，执行”npm install css-loader -D“、”npm install less-loader -D“、”npm install style-loader -D“、”npm install postcss-loader -D“、”npm install postcss-preset-env -D“
// css-loader、less-loader、style-loader、postcss-loader、postcss-preset-env就会被安装到项目的node_modules文件夹下了

// 第二步：给项目配置css-loader、less-loader + style-loader + postcss-loader + postcss-preset-env
// postcss-loader本身的配置是一个跟webpack.config.js同目录级别的固定名字文件————postcss.config.js，我们在里面配置它的插件
// 然后再去去webpack打包配置文件————webpack.config.js————里配置一下loader来处理.css、.less文件

// 第三步：使用webpack对项目打包
// cd到项目根目录下，执行“npm run build”即可