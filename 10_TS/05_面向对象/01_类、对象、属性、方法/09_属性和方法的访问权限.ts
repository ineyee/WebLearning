/*
  TS里属性和方法的访问权限有三种：
  * public（默认）：在项目里的任何地方都能访问
  * protected：在当前类里和子类里能访问
  * private：仅在当前类里能访问，子类里也不能访问
*/
class Person {
  public name!: string;
  protected age: number = 0;
  private height: number = 0;
}

export { };