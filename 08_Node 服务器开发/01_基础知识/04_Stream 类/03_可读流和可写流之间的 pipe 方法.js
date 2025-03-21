const fs = require("fs");

// 当我们想把一个可读流的数据写入到另一个可写流时，可以手动来完成这件事，比如复制一份文件出来就是这么个场景
const readStream = fs.createReadStream("./test_read.txt");
const writeStream = fs.createWriteStream("./test_read_copy.txt");
// 手动来完成这件事
readStream.on("data", (chunk) => {
  // 读取到一点数据就写入到另一个文件里
  writeStream.write(chunk);
});
readStream.on("end", () => {
  // 读取完毕后，调用 end() 方法写入最后一波数据（空数据），与此同时它还会关闭文件（主要目的是关闭文件）
  writeStream.end();
});


// 我们还可以使用 pipe 方法来完成这件事，只需要一行代码
// pipe 的意思就是在可读流和可写流之间建立一根管道，然后把数据传过去
const readStream1 = fs.createReadStream("./test_read.txt");
const writeStream1 = fs.createWriteStream("./test_read_copy1.txt");
readStream1.pipe(writeStream1);
