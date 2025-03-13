// 导入 events 模块
const EventEmitter = require("events");

// 创建事件总线对象
const eventEmitter = new EventEmitter();

// 1、添加事件监听
// 参数就是事件名称和监听到事件后的处理函数
console.log("添加事件监听");
eventEmitter.on("request", handleRequest);

// 2、监听到事件后的处理函数
// 参数就是发出事件时传递的数据
// 需要单独定义，以便取消事件监听时能准确取消掉对应的处理函数
function handleRequest(params) {
  console.log("监听到 request 事件：", params);
}

// 3、发出事件
// 参数就是事件名称和要传递的数据
setTimeout(() => {
  console.log("发出 request 事件");
  eventEmitter.emit("request", {
    url: "https://127.0.0.1/login",
    method: "POST",
    body: {
      username: "admin",
      password: "123456",
    },
  });
}, 1000);

// 4、移除事件监听
// 参数就是事件名称和要取消的处理函数
setTimeout(() => {
  console.log("移除事件监听");
  eventEmitter.off("request", handleRequest);
}, 2000);
