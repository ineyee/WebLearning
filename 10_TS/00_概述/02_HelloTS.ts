/*
  注意：
    * 类型的使用跟 Swift 有点像
    * 这里用的是 boolean、number、string，而非 Boolean、Number、String，因为 TS 里的 boolean、number、string 对应 JS 里的原始类型 boolean、number、string
    * 所以跟 JS 里一样，实际开发中我们应该总是使用原始类型而非包装类型，包装类型交由 JS 引擎自动去搞
*/

// 导入非内置数据类型
// 推荐在导入数据类型时添加 type 关键字，这样编译器在把 TS 代码编译成 JS 代码时，就可以快速放心大胆的移除这些类型相关的代码了
import {
  type BoolNull,
  type NumberNull,
  type StringNull,
} from "./03_custom-types";

let a: BoolNull = true;
console.log(a.valueOf());

let b: NumberNull = 123;
console.log(b.toString());

let c: StringNull = "Hello TS";
console.log(c.length);

/*
  注意：
    * JS 规范声明如果一个 js/ts 文件里没有 export 或 import，会默认将此文件视为脚本文件而非模块文件
    * 而脚本文件里的变量都是全局变量、会污染全局命名空间、会出现命名冲突等问题，模块文件就有自己独立的作用域、不会污染全局命名空间、不会出现命名冲突等问题
    * 所以实际开发中我们应该添加 export {} 强制让文件成为模块
*/
export {};
