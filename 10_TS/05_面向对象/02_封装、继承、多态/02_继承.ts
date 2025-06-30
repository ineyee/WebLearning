/*
  一、继承是指子类拥有了父类所有的属性、方法、静态属性、静态方法，用extends关键字来实现，注意JS里所有的类最终都继承自基类Object
*/
// 父类
class Person {
  constructor(age = 0) {
    this.age = age;
  }

  age;
  static height = 0.6;

  run() {
    console.log("run", this.age);
  }

  static eat() {
    console.log("eat", this.height);
  }
}

// 子类
class Student extends Person {}

let person = new Person();
person.age = 18;
person.run(); // run 18
Person.height = 1.8;
Person.eat(); // eat 1.8

let student = new Student();
student.age = 14;
student.run(); // run 14
Student.height = 1.4;
Student.eat(); // eat 1.4

/* 二、构造函数的补充 */
/*
  1、如果子类不重写父类的构造方法，是没有问题的，创建子类的时候无非是默认调用父类的构造方法
*/
// 父类
class Person1 {
  constructor(age = 0) {
    this.age = age;
  }

  age;

  run() {
    console.log("run", this.age);
  }
}

// 子类
class Student1 extends Person1 {}

let student1 = new Student1(18);
student1.run(); // run 18

/*
  2、如果子类有自己的构造方法——即重写了父类的构造方法，那子类的构造方法里就必须在第一行首先调用一下super()方法————即父类的构造函数，来完成子类继承于父类那部分资源的初始化，然后再做子类自己自定义的内容
*/
// 父类
class Person2 {
  constructor(age = 0) {
    this.age = age;
  }

  age;

  run() {
    console.log("run", this.age);
  }
}

// 子类
class Student2 extends Person2 {
  constructor(age = 0, no = 0) {
    super(age);

    this.no = no;
  }

  no;
}

let student2 = new Student2(18, 9);
student2.run(); // run 18

/*
  三、方法的重写和调用父类的方法
  1、JS里子类重写父类的方法直接重写就行，没有override关键字来修饰
  2、那重写之后怎么调用父类的方法呢？JS里有super关键字来调用父类的方法
*/
class Person3 {
  run() {
    console.log("Person run");
  }
}

class Student3 extends Person3 {
  run() {
    super.run();
    console.log("Student run");
  }
}

let student3 = new Student3();
student3.run();
// Person run
// Student run

/*
  四、super关键字 
  1、super关键字出现在子类的构造方法里时，代表的是父类的构造方法
  2、super关键字出现在子类的实例方法里时，跟OC里的super关键字有异曲同工之妙，都是代表去父类里查找该方法的实现，不同的是OC里的super关键字仅仅是个编译器指示符，而JS里的super关键字则实实在在地指向了父类的原型对象————即父类里存储该方法的地方（当前类的方法都存储在当前类的原型对象里，父类的方法都存储在父类的原型对象里）
  3、super关键字出现在子类的类方法里时，代表的是当前类的父类
*/
class Parent {
  myMethod() {
    console.log("instance method");
  }

  static myMethod() {
    console.log("static method");
  }
}

class Child extends Parent {
  constructor() {
    super(); // 这里的super()方法就代表调用一下父类Parent的构造方法
  }

  myMethod() {
    super.myMethod(); // 这里的super代表Parent的原型对象，这句代码等价于Parent.prototype.myMethod();
  }

  static myMethod() {
    super.myMethod(); // 这里的super代表Parent类，这句代码等价于Parent.myMethod();
  }
}

let child = new Child();
child.myMethod(); // instance method
Child.myMethod(); // static method

export {};
