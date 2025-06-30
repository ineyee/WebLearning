/*
  多态是指子类重写父类的方法、然后父类指针指向子类对象、然后用父类指针调用子类重写的方法，不同的子类就会产生不同的执行结果，是一个针对方法的特性
*/
class Person {
  run() {
    console.log("Person run");
  }
}

class Teacher extends Person {
  // 多态的条件1：子类重写父类的方法
  run() {
    console.log("Teacher run");
  }
}

class Student extends Person {
  // 多态的条件1：子类重写父类的方法
  run() {
    console.log("Student run");
  }
}

let person = new Person();
person.run();

// 多态的条件2：父类指针指向子类对象
let person1 = new Teacher();
// 多态的条件3：用父类指针调用子类重写的方法
person1.run();

// 多态的条件2：父类指针指向子类对象
let person2 = new Student();
// 多态的条件3：用父类指针调用子类重写的方法
person2.run();

// 打印符合多态的效果：
// Person run
// Teacher run
// Student run

export {};
