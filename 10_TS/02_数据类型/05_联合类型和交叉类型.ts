/*
  一、联合类型是或的关系，代表变量只要是多个类型其中之一即可

  TS 是空安全的，比如 string 类型肯定只能赋值字符串、而不能赋值为 null，如果想赋值为 null，那就使用联合类型 string | null，类似于 String?
*/
// let v1: string = "123";
// v1 = null; // 编译报错

let v1: string | null = "123";
v1 = null; // 编译通过
console.log(v1);

/*
  二、交叉类型是且的关系，代表变量必须同时是多个类型

  交叉类型一般用在对象类型的交叉上，而不会用在内置类型的交叉上、因为没有意义、比如没有什么东西即是 number 类型又是 string 类型
*/
// 客户端开发类型
type ClientCoderType = {
  clientLang: string,
};

type ServerCoderType = {
  serverLang: string,
};

const coder: ClientCoderType & ServerCoderType = {
  clientLang: "iOS",
  serverLang: "Java",
};
console.log(coder);

