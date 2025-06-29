/*
  二、object：对象类型，也就是其它语言里的字典类型
  TS里的字典是个泛型集合，它的类型为{[key: T1]: T2;}或Record<T1, T2>，Record<T1, T2>为语法糖，代表字典里的key是T1类型、value是T2类型，如{[key: string]: any}和Record<string, any>类似于别的语言里的Dictionary<String, Any>、Map<String, dynamic>...

  而如果把它不从字典的角度而是从对象的角度考虑时，它的类型为：{属性名1: 属性1的类型, 属性名2: 属性2的类型...}
  如 let person: {
    name: string,
    age: number,
    height: number
  } = {
    "name": "张三",
    "age": 18,
    "height": 1.88
  };

  实际开发中我们也会给这么长的对象类型取个别名来使用，如：
  type PersonType = {
    name: string,
    age: number,
    height: number
  };
  let person: PersonType = {
    "name": "张三",
    "age": 18,
    "height": 1.88
  };
}
*/
/*
  1、字典的定义
*/
let weightKey = "weight";
let person: Record<string, any> = {
  "name": "张三",
  "age": 18,
  "height": 1.88,
  [weightKey]: 140, // 字典的属性也可以是个变量
}
console.log(person); // {name: '张三', age: 18, height: 1.88, weight: 140}

/*
  2、字典的基本操作
*/
// 增
person["weight"] = 140; // 字典式写法
person.weight = 140; // 对象式写法
console.log(person); // {name: '张三', age: 18, height: 1.88, weight: 140}

// 删
delete person["weight"]; // 字典式写法
delete person.weight; // 对象式写法
console.log(person); // {name: '张三', age: 18, height: 1.88}

// 改
person["age"] = 19; // 字典式写法
person.age = 19; // 对象式写法
console.log(person); // {name: '张三', age: 18, height: 1.88}

// 查
let age = person["age"]; // 字典式写法
let age1 = person.age; // 对象式写法
console.log(age); // 19

/*
  3、字典的遍历
*/
// 普通for循环遍历法：首先我们得知道如何获取到字典所有的key和value
console.log(Object.keys(person)); // ['name', 'age', 'height']
console.log(Object.values(person)); // ['张三', 19, 1.88]
for (let i = 0; i < Object.keys(person).length; i++) {
  console.log(`key: ${Object.keys(person)[i]}, value: ${Object.values(person)[i]}`);
  // key: name, value: 张三
  // key: age, value: 19
  // key: height, value: 1.88
}

// for-in遍历法：只能遍历key
for (let key in person) {
  console.log(`key: ${key}, value: ${person[key]}`);
  // key: name, value: 张三
  // key: age, value: 19
  // key: height, value: 1.88
}

// for-of遍历法：同时遍历key和value
for (let [key, value] of Object.entries(person)) {
  console.log(`key: ${key}, value: ${value}`);
  // key: name, value: 张三
  // key: age, value: 19
  // key: height, value: 1.88
}

export { };