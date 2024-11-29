// 通信就是：传递数据、传递事件、传递组件
/*
  常见方案：
  传递数据：属性传递、状态管理库（后面我们专门开一篇）
  传递事件：回调函数传递（本质还是属性传递）、$emit事件传递、EventBus
  传递组件：插槽
*/

import { createApp } from 'vue'
// import App from './01_父传子：属性传递props'
// import App from './02_子传父：回调函数传递（本质还是属性传递）'
// import App from './03_子传父：$emit事件传递emits/App.vue'
import App from './04_跨组件：事件总线mitt库/component/App.vue'

createApp(App).mount('#app')
