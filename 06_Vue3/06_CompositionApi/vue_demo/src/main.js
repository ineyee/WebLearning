import { createApp } from 'vue'
// import App from './01_OptionsApi的弊端、CompositionApi的优势/App.vue'
import App from './02_setup函数和hook函数/App.vue'

createApp(App).mount('#app')

/*
  CompositionApi是对OptoinsApi的一个补充，而不是完全替代
  1、替换的内容：
    * data、methods => setup
    * 计算属性 => setup
    * 属性观察器 => setup
  2、没替换的内容：
    * name
    * components
    * props
    * emits
    * 生命周期函数，但是换了名字（created换成了onCreated）
*/
