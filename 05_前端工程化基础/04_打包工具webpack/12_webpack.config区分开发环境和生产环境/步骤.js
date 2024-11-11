// 前面我们项目里的webpack.config.js只有一份
// 在开发环境下需要将mode修改为“development”并去掉只需要在生产环境下才需要的配置
// 在生产环境下需要将mode修改为“producttion”并去掉只需要在开发环境下才需要的配置
// 这样有利于提升开发和打包效率

// 所以实际开发中Vue和React，我们一般都是创建两份webpack.config.js
// webpack.config.dev.js：一份里只保留开发环境需要的配置
// webpack.config.pro.js：一份里只保留生产环境需要的配重
// 
// 项目里就可以根据是在开发还是打包来选择使用不同的配置文件了，比如：
// “npm run serve”就可以使用webpack.config.dev.js
// “npm run build”就可以使用webpack.config.pro.js
// 见package.json里面的脚本配置
// 我们这里演示可能webpack.config.dev.js和webpack.config.pro.js里面的配置差不多，但实际开发中是有很多配置需要区别环境的，这里先知道这个思想即可

// 当然因为webpack.config.dev.js和webpack.config.pro.js里有很多重复的配置
// 所以我们又会创建一个webpack.config.com.js来存放它们重复的配置
// 然后在webpack.config.dev.js和webpack.config.pro.js里合并上webpack.config.com.js就可以了
// 
// 合并webpack.config.com.js需要用到一个包“webpack-merge”
// 我们先cd到项目个目录，执行“npm install webpack-merge -D”安装这个包，然后去webpack.config.dev.js和webpack.config.pro.js里合并就可以了