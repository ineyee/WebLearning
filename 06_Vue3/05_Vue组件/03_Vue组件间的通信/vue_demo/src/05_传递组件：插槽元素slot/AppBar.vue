<template>
  <div class="app_bar">
    <!--
      分别给左边、中间、右边的元素预留插槽元素slot：
      1、习惯上我们都会在插槽元素外面包一层div，以便在组件内部根据需要对插槽元素做一些配置
      2、插槽元素有一个name属性，用来指定插槽元素的名字，以便外界能把元素准确插入相应插槽元素的位置
      3、Vue里没有提供指定插槽元素是否必传的机制，不过我们可以用“为插槽元素提供占位符”来模拟实现插槽元素必传
        * “为插槽元素提供占位符”来实现插槽元素必传，类似于Flutter里的“required Widget child”，必传时就不用给插槽元素提供默认值了
        * 当插槽元素不必传时
          * 可以给个默认值————类似于Flutter里child可以为空“Widget? child”但为空时展示默认值的情况
          * 也可以不给默认值————类似于Flutter里child可以为空“Widget? child”并且为空时啥也不展示的情况
      4、不管组件内部插槽元素写成啥样，一旦外界传递进了真实元素进来就会被替换掉
    -->
    <div class="leading">
      <slot name="leading">
        <!--
          leading不必传，并且我们给个默认值————给默认值的方式就是在slot元素内写子元素
          这样外界如果不传leadig进来，那就展示我们默认提供的返回，如果传了就用外界提供的返回
        -->
        <button>🔙</button>
      </slot>
    </div>
    <div class="title">
      <slot name="title">
        <!--
          title为必传，“为插槽元素提供占位符”来实现插槽元素必传，本质其实就是提供一个特殊的默认值
          这样外界如果不传title进来，那就会“报错”，如果传了就正常
        -->
        <div style="color: red;">Error: title slot is required.</div>
      </slot>
    </div>
    <div class="action">
      <slot name="action">
        <!--
          action不必传，并且我们不给默认值
          这样外界如果不传action进来，那就啥也不展示，如果传了就展示
        -->
      </slot>
      <!--
        如果插槽没有名字，那它就是个默认插槽，其实默认插槽的也有个名字就是default
        外界在使用时，没用template包裹的组件都会被传递给默认插槽，或者用template包裹但是名字为default的组件都会被传递给默认插槽
        一个组件内部只能有一个默认插槽，这也很好理解，不然外界很多组件都不用具名插槽，那组件内部哪里知道怎么分配传递进来的组件，这就要求外界顶多传进来一个不带名字的组件
      -->
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBar"
}
</script>

<style>
.app_bar {
  height: 44px;

  display: flex;
}

.title {
  flex: 1;

  background-color: peachpuff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.leading {
  width: 80px;

  background-color: plum;

  display: flex;
  justify-content: start;
  align-items: center;
}

.action {
  width: 80px;

  background-color: powderblue;

  display: flex;
  justify-content: end;
  align-items: center;
}
</style>