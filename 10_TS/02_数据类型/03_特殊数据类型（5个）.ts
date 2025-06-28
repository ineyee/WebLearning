/*
  一、undefined：未定义类型，更多地想体现某个变量或常量【被动】未被赋值
  只有一个值undefined
    * 我们可以主动给一个变量赋值为undefined，但实际开发中我们一般不会这么做
    * 实际开发中undefined更多地是一种【被动的状态】，也就是说我们一旦看到undefined就代表一个变量我们声明了但是没有赋值，以便提醒我们在使用前一定要赋值，否则使用时肯定会出错。不过就现在很多编程语言的风格来说，都是强制要求我们在声明变量时就初始化掉，因此如果我们遵循这个风格的话，实际开发中undefined就更少见了
*/
let v1: undefined = undefined;
console.log(v1); // undefined
let v2: undefined;
console.log(v2); // undefined

/*
  二、null：空类型，更多地想体现某个变量或常量【主动】被程序员赋值为 null
  只有一个值null
  我们可以【主动】给一个变量赋值为null，实际开发中我们经常会这么做，null类型其实是对象数据类型的附属类型，一般就是用来给对象数据类型的实例赋值为null，应用场景主要有两个：
    * 声明变量时能初始化就初始化掉，不方便初始化时或不能初始化时就赋值为null
    * null有明确的意义时可以把变量赋值为null，比如1代表数学，2代表语文，null代表全部学科
  
  注意：在其它编程语言里我们如何初始化一个变量一般分为3步，但是TS里只有2步，因为TS里没有延迟初始化这种东西
    * 声明变量时能初始化就初始化掉
    * 不方便初始化时，就延迟初始化，但一定要保证在使用前初始化掉
    * 不能初始化时，就赋值为null，但使用时一定要判空
  
  注意：在其它编程语言里我们如果不给一个对象数据类型的变量初始化，那该变量会被默认初始化为null，而且那些语言的规范也是不让我们显性地给变量初始化为null、全靠自动；但是在TS里我们如果不给一个对象数据类型的变量初始化，那该变量可不是会被默认初始化为null、而是undefined，但是undefined又没有啥用、所以我们反而必须得显性地给变量初始化为null了
*/
let v3: null = null;
console.log(v3); // null

/*
  三、any：任意类型
  有些场景某些数据的类型我们无法确定时就可以用 any，比如 Record<string, any>，能确定的情况下尽量用确定的数据类型而不要用 any
*/
let map: Record<string, any> = {
  name: "张三",
  age: 18,
  height: 1.88,
  wife: undefined,
  job: null,
};
console.log(map); // undefined

/*
  四、unknown：任意类型
  习惯用 any 的话就用 any 吧，其它语言里都是类似 any 这种类型，unknown 的话更加安全，但是判断起来稍显麻烦
*/
let v4: unknown = "hello";
// console.log(v4.length); // 直接使用 unknown 类型的变量编译报错
if (typeof v4 === "string") {
  console.log(v4.length); // 编码阶段必须判断好类型才能使用，所以更加安全
}

/*
  五、void：函数无返回值类型
*/
function v5(): void { }

export { };