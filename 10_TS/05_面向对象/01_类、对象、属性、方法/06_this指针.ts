// 1、为什么需要this指针
// 上面我们说到“成员变量的值存储在对象内部，成员函数存储在对象外部的堆区（其它很多语言成员函数都是存储在代码区）”，也就是说下面的代码中"张三"存储在person对象内部、"李四"存储在person1对象内部，run成员函数存储在堆区只有一份，那么问题来了，既然run成员函数不存储在person对象和person1对象内部，那run成员函数执行体里是怎么知道person对象调用的时候就打印"张三"、person1对象调用的时候就打印"李四"的呢，也就是说堆区的run到底是怎么访问到person、person1这两块栈区的内存的呢？
class Person {
  name: string = "";

  run() {
    console.log(`${this.name} run`);
  }
}

let person = new Person();
person.name = "张三";
person.run(); // 张三 run

let person1 = new Person();
person1.name = "李四";
person1.run(); // 李四 run

// 如果让我们自己实现，也很简单，那就是把调用run成员函数的那个对象作为参数传递给run成员函数——当然因为对象占用的内存可能比较大，所以建议通过指针的方式传递，避免过多地消耗栈内存——这样run成员函数执行体里就能知道是打印person对象的"张三"还是打印person1对象的"李四"了，如下：
class MyPerson {
  name: string = "";

  run(myThis: MyPerson) {
    console.log(`${myThis.name} run`);
  }
}

let myPerson = new MyPerson();
myPerson.name = "张三";
myPerson.run(myPerson); // 张三 run

let myPerson1 = new MyPerson();
myPerson1.name = "李四";
myPerson1.run(myPerson1); // 李四 run

// 其实上面我们已经看到了编译器就是这么做的，编译器已经帮我们做好了这件事，它会为每个成员函数都添加一个隐式参数——this指针——并且这个隐式参数永远位于参数列表的第一位，外界某个对象通过点语法调用成员函数这种高级语言里的写法，在编译的时候编译器其实就是把外界这个对象的内存地址传递给了成员函数的this指针，于是this指针就指向了成员函数的调用者，因此我们就可以在成员函数执行体里通过this指针来访问某个具体对象的成员变量、成员函数了，所有的面向对象语言里对象调用成员函数都是这么设计的，但是在【TS里我们不可以省略this、必须显式地写出来】。

/*
  2、this指针的指向
  * （1）this指针用在实例方法/对象方法中时，默认指向实例方法/对象方法的调用者——某个实例/对象
  * （2）this指针用在静态方法/类方法中时，默认指向当前类
  * （3）TS里除了实例方法和静态方法里可以使用this，普通函数里也可以使用this，此时this指针默认指向window对象
  * （4）箭头函数里没有this指针，但是当我们在箭头函数里使用this时，会走变量的查找链，即箭头函数本身的作用域、上层作用域、......，如果一直没找到、最终this指针就会找到并指向window对象，跟普通函数不同的是普通函数里的this指针不会走查找链、它就是一直指向window对象 
  * （5）不过我们也可以通过call、apply来忽略掉上面的默认指向，强制把this指针指向任何我们希望的对象（当然如果我们传入的是undefined或null这种根本没有对应对象的东西，那这个强制指向就会被忽略，还是按照默认指向来）
*/
// （1）、（2）
class MyObject {
  test() {
    console.log(this);
  }

  static staticTest() {
    console.log(this);
  }
}

let myObject = new MyObject();
myObject.test();
// 打印：MyObject {}
MyObject.staticTest();
// 打印：
// class MyObject {
//   test() {
//     console.log(this);
//   }

//   static staticTest() {
//     console.log(this);
//   }
// }

// // （3）
// (function () {
//   console.log(this);
// })();
// // 打印：Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// // （4）
// (() => {
//   console.log(this);
//   // 打印：Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// })();

// // （5）
// function test(name, age) {
//   console.log(this);
//   console.log(`参数：${name} ${age}`);
// }

// // 第一个参数：this指针
// // 后面的参数：以参数列表的形式传递给原test函数
// test.call("123", "张三", 18);
// // 打印：String {'123'}，字符串“123”的包装类对象
// // 打印：参数：张三 18

// // 第一个参数：this指针
// // 后面的参数：以数组的形式传递给原test函数
// test.apply("123", ["张三", 18]);
// // 打印：String {'123'}，字符串“123”的包装类对象
// // 打印：参数：张三 18

export {};