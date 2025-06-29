/*
  对象创建的时候会自动调用类的constructor()构造方法，一般用来完成对象的初始化工作——如为属性赋初值等。JS里构造方法的特点是：
  * 1、方法名固定就是constructor，可以有参数也可以没有参数，无返回值，不支持重载——即只能有一个构造方法
  * 2、如果我们不自定义构造方法，那编译器会自动生成一个空的【constructor() {}】构造方法，啥也不干
  * 3、实际开发中，我们总是自定义构造方法来完成属性的初始化工作，详见【属性的初始化】
*/

export {};
