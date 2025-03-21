// 注意：代码编写完运行的时候就不是运行在浏览器里了，因为这些代码是针对 Node 开发的，浏览器的运行时环境里压根儿不支持 CommonJS 的导入导出方式，并且也没有 fs 模块这些东西，所以肯定会报错
// 所以我们需要通过 Node 的运行时环境来运行这些代码：直接在终端里 cd 到要运行文件所在的文件夹，然后执行“node 文件名”命令就可以运行了

// 导入 fs 模块
// 浏览器开发里模块化主要用 ESModule（import、export 等），Node 开发里模块化主要用 CommonJS（require、module.exports 等）
// 虽然 Node 开发里也可以使用 ESModule，但是需要额外的配置，所以主要还是使用 CommonJS
const fs = require("fs");

// 1、同步读取
// 同步读取的 API 是 readFileSync，它接收两个参数：
// 第一个参数是文件的路径，必传。如果文件不存在，会抛出异常
// 第二个参数是选项参数，可选
//    encoding：表示文件的编码方式。默认是 null，读取成功时会返回 Buffer 对象；如果指定编码方式，读取成功时会返回字符串
//    flag：表示文件的打开方式。默认是 "r"，表示只读；如果指定 "r+"，表示读写
// console.log("同步读取===========");
// try {
//   const resultBuffer = fs.readFileSync("./test_read.txt");
//   const resultString = fs.readFileSync("./test_read.txt", {
//     encoding: "utf-8",
//     flag: "r+",
//   });
//   console.log("读取成功", resultBuffer);
//   console.log("读取成功", resultString);
// } catch (err) {
//   console.log("读取失败", err);
// }


// 2、异步读取（回调函数的方式）
// 异步读取的 API 是 readFile，它接收三个参数：
// 第一个参数是文件的路径，必传。如果文件不存在，会抛出异常
// 第二个参数是选项参数，可选
//    encoding：表示文件的编码方式。默认是 null，读取成功时会返回 Buffer 对象；如果指定编码方式，读取成功时会返回字符串
//    flag：表示文件的打开方式。默认是 "r"，表示只读；如果指定 "r+"，表示读写
// 第三个参数是回调函数，可选。回调函数接收两个参数：
//    第一个参数是错误对象，如果读取失败，则错误对象不为 null
//    第二个参数是读取到的数据，如果读取成功，则数据为 Buffer 对象或字符串
// console.log("异步读取（回调函数的方式）===========");
// fs.readFile(
//   "./test_read.txt",
//   {
//     encoding: "utf-8",
//     flag: "r+",
//   },
//   (err, resultString) => {
//     if (err) {
//       console.log("读取失败", err);
//     } else {
//       console.log("读取成功", resultString);
//     }
//   },
// );

// 3、异步读取（Promise 的方式）
// console.log("异步读取（Promise 的方式）===========");
// fs.promises.readFile("./test_read.txt", {
//   encoding: "utf-8",
//   flag: "r+",
// }).then(
//   (resultString) => {
//     console.log("读取成功", resultString);
//   },
//   (err) => {
//     console.log("读取失败", err);
//   },
// );

// 4、异步读取（async/await 的方式）
console.log("异步读取（async/await 的方式）===========");
async function readFile() {
  try {
    const resultString = await fs.promises.readFile("./test_read.txt", {
      encoding: "utf-8",
      flag: "r+",
    });
    console.log("读取成功", resultString);
  } catch (err) {
    console.log("读取失败", err);
  }
}
readFile();