/*
  一、array：数组类型
  TS里的数组是个泛型集合，它的类型为T[]或Array<T>，T[]为语法糖。
*/
// 1、数组的声明及初始化
let array1: any[] = [];
let array11: Array<any> = [true, 1, "2"];
console.log(array1); // []
console.log(array11); // [true, 1, '2']

// 2、获取数组的长度
let array2: number[] = [1, 2, 3];
console.log(array2.length); // 3

// 3、判断数组是不是空
let array3: number[] = [];
let array33: number[] = [1, 2, 3];
console.log(array3.length === 0); // true
console.log(array33.length === 0); // false

// 4、数组增
// （1）尾部增
let array4 = [1, 2, 3];
array4.push(4);
console.log(array4); // [1, 2, 3, 4]

// （2）头部增、中间增
// splice(index, 0, item)方法表示从索引index开始，不删除任何元素（第二个参数固定为0），并插入item或items
let array44 = [1, 2, 3];
array44.splice(0, 0, 4);
array44.splice(4, 0, ...[5, 6]);
console.log(array44); // [4, 1, 2, 3, 5, 6]

// （3）一次性增多个元素
let array444 = [1, 2, 3];
array444.push(...[4, 5, 6]);
console.log(array444); // [1, 2, 3, 4, 5, 6]

// 5、数组删
// （1）尾部删
let array5 = [1, 2, 3];
array5.pop();
console.log(array5); // [1, 2]

// （2）头部删、中间删
// splice(index, n)方法表示从索引index开始（包含），删除n个元素
let array55 = [1, 2, 3];
array55.splice(1, 2);
array55.splice(0, 1);
console.log(array55); // []

// （3）一次性删多个元素
// 不通过下标来删的话，得用filter高阶函数来做
let array555 = [1, 2, 3];
array555 = array555.filter(item => ![1, 3].includes(item));
console.log(array555); // [2]

// （4）清空数组
let array5555 = [1, 2, 3];
array5555.length = 0; // 可以清空数组
array5555 = []; // 也可以清空数组，但这种方式其实是把指针指向了一个新的数组对象，严格来说并不是将数组清空
console.log(array5555); // []

// 6、数组改
let array6 = [1, 2, 3];
array6[0] = 4;
console.log(array6); // [4, 2, 3]

// 7、数组查
// （1）查某个下标处的元素
let array7 = [1, 2, 3];
console.log(array7[0]); // 1

// （2）查某个元素的下标
let array77 = [1, 2, 3];
console.log(array77.indexOf(1)); // 0，>=0的整数代表找得到index
console.log(array77.indexOf(4)); // -1，代表找不到index

// （3）数组里是否包含某个元素
console.log([1, 2, 3].includes(1)); // true

// （4）截取子数组
// slice()方法用来获取一个数组的子数组，它需要传入两个参数，第一个参数是子字符串开始的下标（包含），第二个参数是子字符串结束的下标（不包含）
console.log([1, 2, 3].slice(1, 3)); // [2, 3]
// 如果我们只传入开始下标、不传入结束下标，slice()方法会自动把结束下标设置为数组.length（不包含），所以子字符串就是从开始下标到数组结束
console.log([1, 2, 3].slice(1)); // [2, 3]

// 8、数组拼接成字符串
// join()方法用来将数组里的元素按指定的字符给拼接成字符串，并返回拼接后的字符串，对应字符串的split()方法
let joinedString = [1, 2, 3].join('@');
console.log(joinedString); // 1@2@3

// 9、数组的遍历
// 普通for循环遍历法
let array9 = [1, 2, 3];
for (let i = 0; i < array9.length; i++) {
  console.log(array9[i]);
}

// for-in遍历法：只能遍历index
for (let index in array9) {
  console.log(array9[index]);
}

// for-of遍历法：能直接遍历char
for (let item of array9) {
  console.log(item);
}

// 10、数组的排序和反转
let numList = [24, 8, 10, 2, 16];

// （1）反转，会影响原数组
numList.reverse();
console.log(numList); // [16, 2, 10, 8, 24]

// （2）排序，会影响原数组
// 升序排序
numList.sort((item1, item2) => item1 - item2);
console.log(numList); // [2, 8, 10, 16, 24]
// 降序排序
numList.sort((item1, item2) => item2 - item1);
console.log(numList); // [24, 16, 10, 8, 2]

// 11、数组的一些高阶函数
let stuList = [
  { "id": 100, "name": "张三", "age": 18 },
  { "id": 101, "name": "李四", "age": 18 },
  { "id": 102, "name": "王五", "age": 19 },
  { "id": 103, "name": "张三", "age": 19 },
];

// （1）forEach函数：用来遍历数组
stuList.forEach(function (item, index) {
  console.log(item, index);
});

// （2）map函数：用来返回一个自己想要的其它数组——原来数组的每个元素经过某种映射后组成的数组
let nameList = stuList.map((item) => item.name);
console.log(nameList); // ['张三', '李四', '王五', '张三']

// （3）find函数：用来查找并返回满足条件的第一个元素
let findedStu = stuList.find(function (item) {
  return item.name === "张三";
});
console.log(findedStu); // {id: 100, name: '张三', age: 18}

// （4）filter函数：用来过滤并返回满足条件的所有元素
let filteredStuList = stuList.filter((item) => item.name === "张三");
console.log(filteredStuList); // [{id: 100, name: '张三', age: 18}, {id: 103, name: '张三', age: 19}]

export { };