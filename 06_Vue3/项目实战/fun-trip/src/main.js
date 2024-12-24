import { createApp } from 'vue'
import App from './App.vue'

// CSS样式置位
import 'normalize.css';
import './asset/css/index.css';

// 导入路由
import router from './router/router.js';
// 导入pinia
import pinia from './store/store.js';

const app = createApp(App);
// 注册路由
app.use(router);
// 注册pinia
app.use(pinia);
app.mount('#app')
