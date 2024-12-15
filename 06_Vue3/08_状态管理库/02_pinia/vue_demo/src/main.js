import { createApp } from 'vue'

import App from './App.vue'
import pinia from './store'

const app = createApp(App);

// 注册一下pinia全局单例
app.use(pinia);

app.mount('#app')
