// 03_小程序自定义组件/components/hello-world.js
Component({
	/**
	 * 组件的属性列表
	 * 
	 * 专门就是用来接收父组件传递过来的参数的，用于组件间的通信
	 * 类似于 OptionsApi 里的 props、CompositionApi 里的 defineProps
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 * 
	 * 类似于 OptionsApi 里的 data、CompositionApi 里的变量
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 * 
	 * 类似于 OptionsApi 里的 methods、CompositionApi 里的函数
	 * Page 里面的函数是直接定义在外面的，Component 里面的函数是定义在 methods 属性里面的
	 */
	methods: {

	},

	/**
	 *	组件的生命周期函数 
	 */
	lifetimes: {
		attached: () => {
			console.log("创建");
		},
		detached: () => {
			console.log("销毁");
		},
	},
})