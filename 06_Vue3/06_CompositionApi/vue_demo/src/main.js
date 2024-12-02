import { createApp } from 'vue'
// import App from './01_OptionsApi的弊端、CompositionApi的优势/App.vue'
// import App from './02_setup函数和hook函数/App.vue'
// import App from './03_计算属性/App.vue'
// import App from './04_属性观察器/App.vue'
import App from './05_组件的生命周期函数/App.vue'

createApp(App).mount('#app')

/*
  CompositionApi是对OptoinsApi的一个补充，而不是完全替代
  1、替换的内容：
    * data => setup的ref函数（如果数据需要响应式那就用ref函数包裹，如果不需要响应式那就普通值好了；不过CompositionApi里的computed计算属性是基于响应式实现的，所以计算属性所依赖的属性必须是响应式的）
    * methods => setup里直接定义函数
    * 计算属性 => setup的computed函数（计算属性本身也是响应式的）
    * 属性观察器 => setup的watch函数
    * 生命周期函数 => setup的生命周期函数
  2、没替换的内容：
    * name
    * components
    * props
    * emits
*/
