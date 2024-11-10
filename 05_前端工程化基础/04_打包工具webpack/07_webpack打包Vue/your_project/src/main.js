import { createApp } from "vue";
// 在JS中，以默认导出（即export default）的形式导出时，导入时不能使用花括号，命名导出才能使用或括号导入
import App from "./App.vue";

createApp(Hello).mount("#app");