// 用class关键字定义一个Person类（本质上其实是构造函数的语法糖）
class Person {
  // 属性：其实就是变量封装在类里面，省去let或const关键字
  age: number = 0;

  // 方法：其实就是函数封装在类里面，省去function关键字
  run() {
    console.log("run", this.age);
  }
}

// 创建一个person对象
let person = new Person();
person.age = 10;
person.run();