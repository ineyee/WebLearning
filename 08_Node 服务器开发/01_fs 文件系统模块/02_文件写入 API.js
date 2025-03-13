// 注意：代码编写完运行的时候就不是运行在浏览器里了，因为这些代码是针对 Node 开发的，浏览器的运行时环境里压根儿不支持 CommonJS 的导入导出方式，并且也没有 fs 模块这些东西，所以肯定会报错
// 所以我们需要通过 Node 的运行时环境来运行这些代码：直接在终端里 cd 到要运行文件所在的文件夹，然后执行“node 文件名”命令就可以运行了

// 导入 fs 模块
// 浏览器开发里模块化主要用 ESModule（import、export 等），Node 开发里模块化主要用 CommonJS（require、module.exports 等）
// 虽然 Node 开发里也可以使用 ESModule，但是需要额外的配置，所以主要还是使用 CommonJS
const fs = require("fs");

// 1、同步写入
// 同步写入的 API 是 writeFileSync，它接收三个参数：
// 第一个参数是文件的路径，必传。如果文件不存在，会自动创建
// 第二个参数是要写入的内容，必传
// 第三个参数是选项参数，可选
//    encoding：表示文件的编码方式。默认是 "utf-8"，此时适合写入字符串；如果写入的是 Buffer 对象，该方法会忽略编码方式、直接以二进制的方式写入，当然我们也可以指定使用 null 编码、但这是多余的、因为会忽略编码方式
//    flag：表示文件的打开方式。默认是 "w"，表示只写、覆盖整个文件；如果指定 "w+"，表示读写、覆盖整个文件；如果指定 "a"，表示只写、追加到文件末尾；如果指定 "a+"，表示读写、追加到文件末尾
// console.log("同步写入===========");
// try {
//   fs.writeFileSync("./test_write.txt", "Hello fs!", {
//     encoding: "utf-8",
//     flag: "a",
//   });
//   console.log("写入成功");
// } catch (err) {
//   console.log("写入失败", err);
// }


// 2、异步写入（回调函数的方式）
// 异步写入的 API 是 writeFile，它接收四个参数：
// 第一个参数是文件的路径，必传。如果文件不存在，会自动创建
// 第二个参数是要写入的内容，必传
// 第三个参数是选项参数，可选
//    encoding：表示文件的编码方式。默认是 "utf-8"，此时适合写入字符串；如果写入的是 Buffer 对象，该方法会忽略编码方式、直接以二进制的方式写入，当然我们也可以指定使用 null 编码、但这是多余的、因为会忽略编码方式
//    flag：表示文件的打开方式。默认是 "w"，表示只写、覆盖整个文件；如果指定 "w+"，表示读写、覆盖整个文件；如果指定 "a"，表示只写、追加到文件末尾；如果指定 "a+"，表示读写、追加到文件末尾
// 第四个参数是回调函数，可选。回调函数接收一个参数：
//    参数是错误对象，如果写入失败，则错误对象不为 null
// console.log("异步写入（回调函数的方式）===========");
// fs.writeFile(
//   "./test_write.txt",
//   "Hello fs!",
//   {
//     encoding: "utf-8",
//     flag: "a",
//   },
//   (err) => {
//     if (err) {
//       console.log("写入失败", err);
//     } else {
//       console.log("写入成功");
//     }
//   },
// );

// 3、异步写入（Promise 的方式）
// console.log("异步写入（Promise 的方式）===========");
// fs.promises.writeFile("./test_write.txt", "Hello fs!", {
//   encoding: "utf-8",
//   flag: "a",
// }).then(
//   () => {
//     console.log("写入成功");
//   },
//   (err) => {
//     console.log("写入失败", err);
//   },
// );

// 4、异步写入（async/await 的方式）
console.log("异步写入（async/await 的方式）===========");
async function writeFile() {
  try {
    await fs.promises.writeFile("./test_write.txt", "Hello fs!", {
      encoding: "utf-8",
      flag: "a",
    });
    console.log("写入成功");
  } catch (err) {
    console.log("写入失败", err);
  }
}
writeFile();