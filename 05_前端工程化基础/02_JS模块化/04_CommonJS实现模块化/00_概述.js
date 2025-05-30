/*
  浏览器这个JS运行时环境没有实现CommonJS，而Node这个JS运行时环境实现了CommonJS，因此我们在Node开发中可以使用CommonJS来进行JS模块化开发
  浏览器中进行JS模块化开发的话可以使用后面的ESModule，当然ESModule也可以用在Node开发里
  所以接下来的demo我们就是面向Node了，不面向浏览器了

  也就是说在Node运行时环境下，在JS里，一个js文件天然就是一个模块 <=> 具备单独的作用域 <=> 有自己的命名空间，具体地说：
  * 某个js文件里的变量名和函数名可以跟全局作用域里的变量名和函数名重复、不会报重复定义的错，就是因为这个js文件有单独的作用域、不会污染全局作用域
  * 多个js文件里的变量名和函数名可以重复、不会报重复定义的错，就是因为这多个js文件有单独的作用域、不会互相污染
  * 如果要在同一个作用域里使用重复的变量名和函数名也没问题，因为我们在使用require导入时必然得给导入的东西取个名字、否则就没法使用导入的东西，相当于强制我们实现了Dart里的“import as”来避免冲突
  * 使用module.exports、exports导出，要导出哪些变量和函数在此刻做决定
  * 使用require导入，可以访问被导出来的变量和函数
  
  浏览器开发里模块化主要用 ESModule（import、export 等）
  Node 开发里模块化主要用 CommonJS（require、module.exports 等），虽然 Node 开发里也可以使用 ESModule，但是需要额外的配置，所以主要还是使用 CommonJS
*/