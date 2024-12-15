import { createApp } from 'vue'

// import App from './01_vuex的基本使用：state和mutations/App.vue';
// import store from './01_vuex的基本使用：state和mutations/store';

// import App from './02_vuex getters的使用/App.vue';
// import store from './02_vuex getters的使用/store';

// import App from './03_vuex actions的使用/App.vue';
// import store from './03_vuex actions的使用/store';

import App from './04_vuex modules的使用/App.vue';
import store from './04_vuex modules的使用/store';

const app = createApp(App);

// 注册一下store全局单例
app.use(store);

app.mount('#app')
