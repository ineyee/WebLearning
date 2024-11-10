// js文件里导入.less文件，也是用import导入即可
// 当导入的那个文件里没有导出或者我们不使用导入的那个文件里的导出时，可以省略掉from
import "../css/content_style.less";

const contentEle = document.createElement("div");
contentEle.textContent = "我是内容";
contentEle.classList.add("content");
document.body.append(contentEle);