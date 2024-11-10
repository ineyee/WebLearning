// webpack默认情况下只能对.js文件进行处理和打包
// 而对.css文件和.less文件、图片文件、.vue文件等需要用不同的loader来处理后才能打包，没有loader直接打包的话会报错

// 实际开发中我们可能会使用ES6的语法，或者使用TS，或者用React的JSX，如果没有babel，那webpack打包出来的JS就是我们所编写的内容，但是我们编写的内容可能会存在兼容性问题，此时就需要用babel把我们编写的代码转换成ES5最普通的JS代码，当然bable-loader还依赖@babel/preset-env这个插件包才能完成这很多事情，所以我们还得安装下@babel/preset-env这个插件包

// 第一步：给项目安装babel-loader + @babel/preset-env
// cd到项目根目录下，执行”npm install babel-loader -D“、”npm install @babel/preset-env -D“
// babel-loader、@babel/preset-env就会被安装到项目的node_modules文件夹下了

// 第二步：给项目配置babel-loader + @babel/preset-env
// babel-loader本身的配置是一个跟webpack.config.js同目录级别的固定名字文件————babel.config.js，我们在里面配置它的插件
// 然后再去去webpack打包配置文件————webpack.config.js————里配置一下loader来处理.js文件

// 第三步：使用webpack对项目打包
// cd到项目根目录下，执行“npm run build”即可