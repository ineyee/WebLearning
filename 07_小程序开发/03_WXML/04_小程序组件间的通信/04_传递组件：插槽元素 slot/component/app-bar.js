// 04_小程序组件间的通信/04_传递组件：插槽元素 slot/component/app-bar.js
Component({
	options: {
		// 注意：在小程序开发里，如果一个组件里有多个插槽，那就必须去 Component 构造函数里声明要使用多个插槽，默认情况下一个组件里是不使用多插槽的
		multipleSlots: true,
	},

	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})