// 使用require导入
// 还记得Node里的全局对象require函数吗？CommonJS里的导入其实就是在调用那个函数获取到相应路径下导出的map
// 
// 这里感受一下我们前面说的：如果要在同一个作用域里使用重复的变量名和函数名也没问题，因为我们在使用require导入时必然得给导入的东西取个名字、否则就没法使用导入的东西，相当于强制我们实现了Dart里的“import as”来避免冲突
//
// 注意：就算main.js和file1.js、file2.js在同一个文件夹下，导入时也不能省略“./”，“./”代表当前文件夹

const module1 = require("./file1.js");
console.log(module1); // { personName: '张三', run: [Function: run] }
console.log(module1.personName); // 张三
module1.run(); // 张三 run

const module2 = require("./file2.js");
console.log(module2); // { personName: '李四', run: [Function: run] }
console.log(module2.personName); // 李四
module2.run(); // 李四 run