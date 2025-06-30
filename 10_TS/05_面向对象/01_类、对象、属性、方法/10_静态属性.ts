// 静态属性是指用static修饰的属性，可以用“类名.属性”的方式来访问
// 我们使用静态属性一般都是那些能直接初始化的情况，所以定义静态属性时直接初始化掉
class Person {
  static age = 18;
}
console.log(Person.age);

export {};
