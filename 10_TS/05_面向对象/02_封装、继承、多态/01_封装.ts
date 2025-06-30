/*
  我们把众多变量和函数都放到一个类里，将来通过类和对象来访问这些变量和函数，而不再是零散地独立地访问众多变量和函数，这可以称之为封装
  
  通常情况下，我们还会把属性私有化，然后提供公开的setter方法和getter方法供外界访问属性
*/
class Person {
  private _age: number = 0;

  set age(value) {
    if (value < 0) {
      this._age = 0;
    } else {
      this._age = value;
    }
  }

  get age() {
    return this._age;
  }
}

let person = new Person();
person.age = -10;
console.log(person.age); // 0

export {};
