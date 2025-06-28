/*
  一、boolean：布尔类型
  TS里的布尔值用true和false两个关键字表示

  当我们调用 boolean 类型的方法时，TS 引擎会自动帮我们做装箱（装箱成对象数据类型）和拆箱（拆箱回基本数据类型）操作、将它搞成包装类型 Boolean，以便使用一些属性和方法，但实际开发中我们应该总是使用原始类型而非包装类型，包装类型交由 TS 引擎自动去搞
*/
let yes = true;
let no = false;

console.log(yes.valueOf()); // true
console.log(no.valueOf()); // false

/*
  二、number：数值类型，包含了其它语言里的整型和浮点型
  TS里的整数和小数统称为数值

  当我们调用 number 类型的方法时，TS 引擎会自动帮我们做装箱（装箱成对象数据类型）和拆箱（拆箱回基本数据类型）操作、将它搞成包装类型 Number，以便使用一些属性和方法，但实际开发中我们应该总是使用原始类型而非包装类型，包装类型交由 TS 引擎自动去搞
*/
let int = 10;
let float = 3.14;

console.log(int.toString()); // "10"
console.log(float.toString()); // "3.14"

/*
  三、string：字符串类型，其它语言里字符串是对象数据类型而非基本数据类型
  当我们调用 string 类型的方法时，TS 引擎会自动帮我们做装箱（装箱成对象数据类型）和拆箱（拆箱回基本数据类型）操作、将它搞成包装类型 String，以便使用一些属性和方法，但实际开发中我们应该总是使用原始类型而非包装类型，包装类型交由 TS 引擎自动去搞

  TS里的字符串可以使用单引号''或双引号""，推荐使用双引号，因为所有的编程语言基本都使用双引号
  TS里的字符串还可以使用反引号``，称为模板字符串，不过这种一般用来做字符串拼接
*/
// 1、字符串的声明及初始化
let str1 = '123';
let str11 = "123";
let str111 = `123`;

// 2、获取字符串的长度
let str2 = "123";
console.log(str2.length); // 3

// 3、判断字符串是不是空
let str3 = "";
let str33 = "123";
console.log(str3.length === 0); // true
console.log(str33.length === 0); // false

// 4、字符串增、删、改
// TS里的字符串是不可变字符串，所以我们只能给一个字符串变量重新赋值，而没有append、remove、replace之类的方法来直接修改字符串
let str4 = "123";
str4 = str4.replace("2", "22"); // str4.replace会返回一个新的字符串，我们是把这个新的字符串重新赋值给了str4，而并不是直接修改str4
console.log(str4); // 1223

// 5、字符串查
// （1）查某个下标处的字符
let str5 = "123";
console.log(str5[0]); // 1
console.log(str5.charAt(0)); // 1

// （2）查某个字符或子字符串的下标
// indexOf()方法用来从下标为index处（包含，默认为0）开始查找某个字符或子字符串在字符串中第一次出现时的下标
let str55 = "123";
console.log(str55.indexOf("1", 1)); // -1，代表找不到index
console.log(str55.indexOf("23")); // 1，>=0的整数代表找得到index

// （3）字符串里是否包含另外一个子字符串
console.log("123".includes("23")); // true

// （4）截取子字符串
// substring()方法用来获取一个字符串的子字符串，它需要传入两个参数，第一个参数是子字符串开始的下标（包含），第二个参数是子字符串结束的下标（不包含）
console.log("Java Script".substring(5, 7)); // Sc
// 如果我们只传入开始下标、不传入结束下标，substring()方法会自动把结束下标设置为字符串.length（不包含），所以子字符串就是从开始下标到字符串结束
console.log("Java Script".substring(5)); // Script

// 6、字符串拆分成数组
// split()方法用来将字符串按指定的字符给切开，并返回由切开后字符组成的数组，对应数组的join()方法
let splitStrList = 'a@b@c'.split('@');
console.log(splitStrList); // ["a", "b", "c"]

// 7、字符串拼接
// 可以用加号+
// 可以用反引号`${}`（推荐）
let name = "张三";
let age = 18;
let info1 = "我的名字叫" + name + "，我的年龄是" + String(age) + "岁";
let info2 = `我的名字叫${name}，我的年龄是${age}岁`;
console.log(info1); // 我的名字叫张三，我的年龄是18岁
console.log(info2); // 我的名字叫张三，我的年龄是18岁

/*
  8、字符串的遍历
*/
// 普通for循环遍历法
let chars = "Hello World!";
for (let i = 0; i < chars.length; i++) {
  console.log(chars[i]);
}

// 不能用for-in遍历法：只能遍历index
// for (let index in chars) {
//   console.log(chars[index]);
// }

// for-of遍历法：能直接遍历char
for (let char of chars) {
  console.log(char);
}

export { };