// webpack is a static module bundler for modern JavaScript applications
// webpack是一个【静态的】、【模块化的】打包工具，为【现代的】JavaScript应用程序
// 【静态的】是指：无论我们是通过Vue还是React等框架的代码来开发应用程序，webpack最终都会把这些代码打包成原生的HTML、CSS、JS代码，而HTML、CSS、JS我们称之为静态资源
// 【模块化的】是指：webpack内部支持了CommonJS和ESModule等模块化方案，这就意味着我们在开发中无论采用哪种模块化方案，webpack都能成功识别，它会把很多东西都当做一个模块来看待————CSS文件、JS文件、图片文件、Vue文件等
// 【现代的】是指：早期我们在开发JavaScript应用程序时是用原生的HTML、CSS、JS代码，那根本用不到webpack来打包，现在都是用Vue、React等框架的代码来开发了，webpack专门是针对这种情况的

// webpack本身也是用JS写的、它也运行在Node.js这个JavaScript运行时环境下，所以电脑上首先得有Node.js环境
// 然后我们可以通过包管理工具npm来安装webpack，不过需要注意的是实际开发中我们一般不是全局安装一个webpack + 所有项目都是用这同一个webpack来打包，因为我们可能是用Vue在开发项目，也可能是用React在开发项目，不同的项目可能需要不同版本的webpack，同一个webpack可能无法适用于所有的项目，因此我们一般都是给每个项目都安装一个webpack，每个项目可以根据自己的需要来选择不同版本的webpack
// 安装webpack需要同时安装webpack和webpack - cli，cd到项目根目录下，执行：
// npm install webpack webpack-cli -D（-D必须是大写的D，代表只安装在开发环境下，因为生产环境不需要打包工具）