/*
  一、JS里和TS里也提供了可选链?.，来帮助我们减少编写判空操作，代码可以更加简洁
  没有可选链的时候，如果对象没有某个方法（null or undefined），我们还去调用，就会直接崩溃，所以我们通常都会编写大量的判空操作，代码会非常繁琐
  而有了可选链，就可以省去这大量的判空操作了，可选链前面只要为空就会自动停止后面的调用，就不会崩溃了
*/
class Person {
  constructor(name: string) {
    this.name = name;
  };

  name: string;
  run() {
    console.log("run", this.name);
  }
}

const person = new Person("阿甘");

// 没有可选链的时候
if (person.run !== null && person.run !== undefined) {
  person.run();
}

// 有了可选链
person.run?.();

/*
  二、TS里也提供了强制解包
  如果我们非常明确某个值不可能为空，那就可以直接使用强制解包来使用它
*/
person.run!();

/*
  三、JS里和TS里也提供了空合并运算符 ??，来帮助我们减少编写判空操作，代码可以更加简洁
  如果 ?? 前面有值，那就使用该值；如果 ?? 前面为null或undefined，那就使用 ?? 后面的值
*/
let originName;

// 没有??的时候
let name1;
if (originName === null || originName === undefined) {
  name1 = "默认值";
} else {
  name1 = originName;
}

// 有了??
let name2 = originName ?? "默认值";

export { };