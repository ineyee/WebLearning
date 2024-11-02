/*
  情况一：当require的参数是Node内置的系统模块时——直接就是一个名字、不是路径，比如http、fs等
  直接返回相应的系统模块并停止查找
*/
require("http");
require("fs");

/*
  情况二：当require的参数是三方库的模块时——直接就是一个名字、不是路径，比如axios等
  * 第一步：先去当前文件夹下找到一个名字固定为“node_modules”的文件夹（将来我们使用的三方库必定都存储在这个文件夹下）
  * 第二步：去“node_modules”文件夹下查找相应的文件夹如“axios”文件夹
  * 第三步：去“axios”文件夹下依次查找“index.js”、“index.json”、“index.node”文件
  * 第四步：如果经过前三步还找不到对应的模块，则报错“Cannot find module xxx”
*/
require("axios");

/*
  情况三：当require的参数是我们自己编写的模块时————肯定是以“./”或“../”开头的路径，如file1、file2等
  * 第一步：先把路径当做一个文件来看待
    * 如果路径里有后缀名，则查找对应的文件
    * 如果路径里没有后缀名，则依次自动拼接“.js”、“.json”、“.node”后缀名，查找对应的文件
  * 第二步：如果没找到对应的文件，则把路径当做一个文件夹来看待
    * 依次查找该文件夹下的“index.js”、“index.json”、“index.node”文件
  * 第三步：如果经过前两步还找不到对应的模块，则报错“Cannot find module xxx”
*/
require("./file1.js");
require("./file2.js");