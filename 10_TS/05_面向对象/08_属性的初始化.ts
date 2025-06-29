/*
  属性在初始化之前，它里面存储的值是以前使用过的垃圾值，因此属性在使用之前必须初始化，避免因为垃圾值带来未知的错误，尽管有些情况下编译器会自动帮我们给某些属性初始化一个默认值，但并非所有的情况都如此，所以还是建议手动初始化。关于属性的初始化，通常有三种做法：
  第1种做法：声明属性的时候就初始化
  第2种做法：在构造方法里初始化属性
  第3种做法：late延迟初始化，在使用属性之前再初始化，TS里用!代表延迟初始化
*/

class Person {
  // 第 2 种始化方式：在构造方法里初始化属性
  constructor(
    age: number,
    // 构造方法里不给默认值，就是必选参数
    sex: string,
    // 构造方法里给个默认值，就是可选参数
    height: number = 0,
  ) {
    this.height = height;
    // 这里是真正的初始化操作
    this.sex = sex;
    this.age = age;
  }

  // 第 1 种初始化方式：声明属性的时候就初始化
  age: number = 0;

  height: number;
  sex: string;

  // 第 3 种初始化方式：late延迟初始化，在使用属性之前再初始化
  car!: Car;
}

class Car {
  constructor(price: number = 16.8) {
    this.price = price;
  }

  price: number;
}

let person = new Person(66, "女");
person.car = new Car();
console.log(person);

export { };