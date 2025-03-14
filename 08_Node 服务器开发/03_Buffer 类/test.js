/*=================================
  ## Buffer 是什么
    * 我们会发现，对于客户端开发和前端开发来说，通常很少会和二进制直接打交道，但是对于服务器开发来说，我们经常需要直接操作二进制数据，比如图片、音频、视频、文档等
    * 所以 Node 为了方便我们直接操作二进制数据，提供了 Buffer 类，Buffer 类就是用来处理二进制数据流的
    * 并且 Buffer 类是全局的，所以不需要引入就可以使用

  ## Buffer 的本质
    * Buffer 的本质其实就是一个二进制数组，数组中的每一个元素都是一个字节的二进制数据
    * 比如[0000_0000, 0000_0001, 1111_1110, 1111_1111]，不过为了方便我们阅读，通常会转换为十六进制，所以上面的二进制数组转换为十六进制就是[0x00, 0x01, 0xFE, 0xFF]
=================================*/

/*=================================
  创建 Buffer 对象，Buffer.from(xxx)：直接用字符串或数组创建 Buffer 对象，不定长 buffer
  
  注意当从数组创建 Buffer 时，数组中的每个元素应该是 0~255 范围内的整数，因为数组中的每个元素将对应 buffer 中的一个字节，一个字节能表示的范围就是 0~255
=================================*/
// 字符串转 buffer
const bufferFromString = Buffer.from("Hello World", {
  encoding: "utf-8",
});
console.log(bufferFromString); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
// buffer 转字符串
const string = bufferFromString.toString("utf-8");
console.log(string); // Hello World

// 数组转 buffer
const bufferFromArray = Buffer.from([1, 2, 3]);
console.log(bufferFromArray); // <Buffer 01 02 03>
// buffer 转数组
const bufferToArray = bufferFromArray.toJSON();
console.log(bufferToArray.data); // [ 1, 2, 3 ]

/*=================================
  创建 Buffer 对象，Buffer.alloc(xxx)：创建一个指定字节数长度的 Buffer 对象，定长 buffer，默认全部用 0 填充

  注意当给每个字节赋值时，赋值的内容应该在 0~255 范围内，因为 buffer 里的每个字节只能表示 0~255 范围的整数
=================================*/
const bytes = Buffer.alloc(7);
// header
bytes[0] = 0x00;
bytes[1] = 0x26;
bytes[2] = 0x01;
bytes[3] = 0x00;
bytes[4] = 0x02;
// payload
bytes[5] = 0x01;
bytes[6] = 0x00;
console.log("发送命令：", bytes);