// 这是主模块
// 我们通常会在主模块里export出所有我们希望被外界访问的其它模块，这样外界在使用这个包时就可以把这个包视作一个整体而不是一堆零散的模块、也就是说只import这个主模块就可以了

// 1、传统的实现方法：先导入后导出
// import {
//   personName as personName1,
//   run as run1,
// } from "./file1.js";

// import {
//   personName as personName2,
//   run as run2,
// } from "./file2.js";

// export {
//   personName1,
//   run1,
//   personName2,
//   run2,
// }

// 2、export和import的结合使用：export from
export {
  personName as personName1,
  run as run1,
} from "./file1.js";

export {
  personName as personName2,
  run as run2,
} from "./file2.js";