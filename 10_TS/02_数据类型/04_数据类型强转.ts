/*
  Boolean()、Number()和String()等函数
  as强转
*/

/*
  1、Boolean()函数
  Boolean()函数可以把任意数据类型的值转换为布尔值。它的转换规则相对简单：除了以下两个值会被转换为false，其它所有的值都会被转换为true
    * 0（数字0，包含-0和+0）
    * ""（空字符串，不是空格）
*/
// Number -> Boolean
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true

// String -> Boolean
console.log(Boolean("")); // false
console.log(Boolean(" ")); // true

/*
  2、Number()函数
  Number()函数可以把任意数据类型的值转换为数值
*/
// Boolean -> Number
console.log(Number(false)); // 0
console.log(Number(true)); // 1

// String -> Number
// 如果字符串可以被转换成数值，则转换成相应的数值
console.log(Number("11")); // 11
// 如果字符串不可以被转换成数值，则返回NaN
console.log(Number("11hi")); // NaN
// 如果是空字符串或者空格，则转换成0
console.log(Number("")); // 0
console.log(Number(" ")); // 0
// 会自动忽略字符串前后的空格
console.log(Number("    11    ")); // 11

/*
  3、String()函数
  String()函数可以把任意数据类型的值转换为字符串
*/
// Boolean -> String
console.log(String(false)); // "false"
console.log(String(true)); // "true"

// Number -> String
console.log(String(11)); // "11"

/*
  4、as强转
*/
const map: Record<string, any> = {
  name: "张三",
  age: 18,
  height: 1.88,
};
// 这样直接读取出来，name 是 any 类型
// const name: string = map["name"];
// 如果我们非常确定 name 的类型，就可以用 as 强转成我们确定的类型
const name: string = map["name"] as string;

export { };