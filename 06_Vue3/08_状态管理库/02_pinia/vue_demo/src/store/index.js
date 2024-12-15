// 使用pinia的话，一般都是创建一个store文件夹，然后里面再创建一个index.js

// 导入创建pinia的函数
import { createPinia } from "pinia";

// 创建pinia，注意pinia可不是store，它就是pinia、专门用来给我们的项目配置使用pinia来进行状态管理，store我们后面会一个一个创建出来
const pinia = createPinia();

// 默认导出pinia
// 因为这个pinia是一个全局单例，所以一定是在createApp的地方来统一注册一下这个pinia，别忘了注册
export default pinia;