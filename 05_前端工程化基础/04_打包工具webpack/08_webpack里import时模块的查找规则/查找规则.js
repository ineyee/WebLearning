// 我们之前已经说过webpack是一个模块化打包工具，也就是说它会把很多东西都当做一个模块来看待————CSS文件、JS文件、图片文件、Vue文件等都会被当成一个模块，那在用import导入这些模块时import的查找规则是什么呢？

/*
  情况一：当import的是Node内置的系统模块时——直接就是一个名字、不是路径，比如http、fs等
  直接返回相应的系统模块并停止查找

  export default导出时，不能用花括号导入、直接写名字即可
*/
import http from "http";
import fs from "fs";

/*
  情况二：当import的是三方库的模块时——直接就是一个名字、不是路径，比如vue等
  * 第一步：先去当前文件夹下找到一个名字固定为“node_modules”的文件夹（将来我们使用的三方库必定都存储在这个文件夹下）
  * 第二步：去“node_modules”文件夹下查找相应的文件夹如“vue”文件夹
  * 第三步：去“vue”文件夹下依次查找“index.js”、“index.json”、“index.node”文件
  * 第四步：如果经过前三步还找不到对应的模块，则报错“Cannot find module xxx”
  
  export {}命名导出时，才能用花括号导入
*/
import { creareApp } from "vue";

/*
  情况三：当import的是我们自己编写的模块时————肯定是以“./”或“../”开头的路径，如file1、file2等
  * 第一步：先把路径当做一个文件来看待
    * 如果路径里有后缀名，则查找对应的文件
    * 如果路径里没有后缀名，则依次自动拼接“.js”、“.json”、“.node”后缀名，查找对应的文件，【实际开发中我们都会去webpack.config.js文件配置可自动拼接的后缀名、以便在导入时就不用写后缀名了，但是实践中建议仅对“.js、.jsx、ts、.tsx”等JavaScript和TypeScript文件使用省略后缀功能，对于CSS、图片、Vue等文件，推荐显式写出文件后缀，以避免潜在的问题】
  * 第二步：如果没找到对应的文件，则把路径当做一个文件夹来看待
    * 依次查找该文件夹下的“index.js”、“index.json”、“index.node”文件
  * 第三步：如果经过前两步还找不到对应的模块，则报错“Cannot find module xxx”
*/
import "css/xxx.css";
import { yyy } from "js/yyy.js";
import { yyy } from "js/yyy";
import zzz from "img/zzz.png";