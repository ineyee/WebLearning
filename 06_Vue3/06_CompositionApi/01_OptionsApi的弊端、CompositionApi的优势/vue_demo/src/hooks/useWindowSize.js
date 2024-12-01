// ref函数是为了把普通值的属性包装成响应式对象的
import { ref } from 'vue';

// 定义一个函数，把逻辑都写在这个函数里
// 
// 这里使用的是默认导出法，所以外界在导入时绝对不能使用{}
// 当然我们也可以使用单独导出法或整体导出法，那外界在导入时就必须得使用{ }
export default function () {
  // 定义属性时，用ref包裹一下，属性就是响应式的了，这一步跟Flutter里类似
  // 并且这样一来我们就可以把属性定义成常量了，因为将来我们修改的是属性.value而非属性本身
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  // 定义方法时，建议用箭头函数赋值的形式
  const get = () => {
    // 修改属性时，得修改它的的value，这一步跟Flutter里一致
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  // 把外界需要访问的东西（属性也好、方法也好）通过对象的方式返回
  // 以便外界使用展开运算符或解构赋值便捷获取后使用
  return { windowWidth, windowHeight, get };
};