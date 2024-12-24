// 导入创建pinia的函数
import { createPinia } from "pinia";

// 创建pinia，注意pinia可不是store，它就是pinia、专门用来给我们的项目配置使用pinia来进行状态管理，store我们后面会在各个业务模块的文件夹里一个一个创建出来
const pinia = createPinia();

// 默认导出pinia
// 因为这个pinia是一个全局单例，所以一定是在createApp的地方来统一注册一下这个pinia，别忘了注册
export default pinia;