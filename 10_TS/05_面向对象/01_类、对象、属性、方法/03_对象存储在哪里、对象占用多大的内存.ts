/*
  TS里对象存储在堆区

  TS里对象的内存大小，通常来说就按结构体变量的内存大小那样去分析就是对的。需要注意的是对象的内存大小只跟属性有关，只有属性的值才存储在对象内部，方法是存储在它的原型对象里的，所以方法不占用对象的内存
*/

export {};
