// js文件里导入.css文件，也是用import导入即可
// 当导入的那个文件里没有导出或者我们不使用导入的那个文件里的导出时，可以省略掉from
import "../css/title_style.css";

const titleEle = document.createElement("div");
titleEle.textContent = "我是标题";
titleEle.classList.add("title");
document.body.append(titleEle);