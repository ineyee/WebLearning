// 静态方法是指用static修饰的方法，可以用“类名.静态方法”的方式来访问
class Person {
  static age = 18;
  static run() {
    console.log("run", this.age);
  }
}
Person.run();

export {};
