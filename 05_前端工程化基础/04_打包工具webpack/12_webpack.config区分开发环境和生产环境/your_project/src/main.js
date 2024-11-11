// 当导入的那个文件里没有导出或者我们不使用导入的那个文件里的导出时，可以省略掉from
import "./component/title_component.js";
import "./component/content_component.js";

// 指定哪些模块需要做热更新，而不总是热重启
if (module.hot) {
  module.hot.accept("./component/content_component.js");
}