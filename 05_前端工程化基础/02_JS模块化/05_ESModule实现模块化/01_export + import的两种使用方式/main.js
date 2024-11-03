// 导入方式一：import全部导入法（比较常用）
// “*”代表导入模块内全部导出的东西
// 使用全部导入法时我们必然得给导入的东西取个名字、否则就没法使用导入的东西，相当于强制我们实现了Dart里的“import as”来避免冲突
//
// 注意：就算main.js和file1.js、file2.js在同一个文件夹下，导入时也不能省略“./”，“./”代表当前文件夹
import * as module1 from "./file1.js";

// 导入方式二：import部分导入法（也比较常用）
// 可以按需只导入我们需要使用的东西，不是必须得导入全部的东西
// 这里的{}同样不是一个map，而是一个专门用来跟import关键字联合使用的语法
// {}里导入东西的原名一定要跟导出时的名字一样，别名就可以随便取了
//
// 注意：就算main.js和file1.js、file2.js在同一个文件夹下，导入时也不能省略“./”，“./”代表当前文件夹
import {
  personName,
  run as run2,
} from "./file2.js";

console.log(module1.personName); // 张三
module1.run(); // 张三 run

console.log(personName); // 李四
run2(); // 李四 run