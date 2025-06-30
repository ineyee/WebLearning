/*
  泛型的本质就是【数据类型参数化】，也就是说把所操作的数据类型指定为一个参数。这种数据类型可以用在类、接口和方法的创建中，分别称为【泛型类、泛型接口、泛型方法】，从而编写出可重用的类、接口和方法，以便提高代码复用率。建议的泛型名称为：
  * T：Type
  * E：Element
  * K：Key
  * V：Value
  * S、U、V：2nd、3rd、4th types
*/

// 1、泛型函数举例
function printNumber(v1: number, v2: number) {
  console.log(v1, v2);
}

function printString(v1: string, v2: string) {
  console.log(v1, v2);
}

function printValue<T>(v1: T, v2: T) {
  console.log(v1, v2);
}

printNumber(10, 20);
printString("10", "20");

printValue<number>(10, 20);
printValue<string>("10", "20");

// 2、泛型类举例
class Student1 {
  // 数字分数制
  score: number = 60;
}

class Student2 {
  // 等级分数制
  score: string = "C";
}

class Student<T> {
  score: T;

  constructor(v: T) {
    this.score = v;
  }
}

const stu1 = new Student1();
const stu2 = new Student2();
console.log(stu1.score);
console.log(stu2.score);

const stu3 = new Student<number>(100);
const stu4 = new Student<string>("A");
console.log(stu3.score);
console.log(stu4.score);

// 3、泛型接口举例
interface Runnable<T> {
  run(v: T): void;
}

class Teacher implements Runnable<string> {
  run(v: string): void {
    console.log(`Teacher is running to complete homework: ${v}`);
  }
}

class Dog implements Runnable<number> {
  run(v: number): void {
    console.log(`Dog is running at ${v} km/h`);
  }
}

// 使用示例
const teacher = new Teacher();
teacher.run("Math assignment");

const dog = new Dog();
dog.run(15);

export {};
