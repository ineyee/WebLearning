import { createApp } from 'vue'
import App from './App.vue'

// CSS样式置位
import 'normalize.css';
import './asset/css/index.css';

// 导入路由
import router from './router/router.js';

const app = createApp(App);
// 注册路由
app.use(router);
app.mount('#app')
