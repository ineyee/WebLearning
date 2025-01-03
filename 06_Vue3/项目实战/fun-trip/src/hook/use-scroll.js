import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

// ```Example
// 
// <template>
//   <div class="scroll-container" ref="_scrollElementRef">
//   </div>
// </template>
// 
// <script setup>
// import { useElementScroll } from '@/hook/use-scroll';
// 
// const _scrollElementRef = useElementScroll({
//   atBottomCallback: () => {
//     console.log("滚动到底部了");
//   },
// });
// ```
// 
// 注意：这里能监听到元素的滚动事件，是基于界面的根元素设置了如下样式，否则界面的滚动是window元素在滚动而不是界面的根元素在滚动（当然我们也可以去监听window的滚动）
// height: 100vh; // 100vh：屏幕的高度
// overflow-y: scroll; // 确保内容可滚动
export function useElementScroll({scrollingCallback, atBottomCallback}) {
  // 函数里定义的是局部变量，所以不能直接返回非引用类型的数据，否则函数调用结束后局部变量就销毁了，会发生坏内存访问，需要返回引用
  const scrollElementRef = ref(null); // 用于绑定到滚动的元素

  // 加个节流
  const onScroll = throttle((event) => {
    const element = event.target;

    const contentTotalHeight = element.scrollHeight; // 内容的总高度
    const contentScrolledHeight = element.scrollTop; // 内容已滚动的高度
    const contentSingleScreenHeight = element.clientHeight; // 单屏能显示下的内容高度
    const isAtBottom =
      contentScrolledHeight + contentSingleScreenHeight >= contentTotalHeight;

    if (scrollingCallback !== null && scrollingCallback !== undefined) {
      scrollingCallback({
        contentTotalHeight,
        contentScrolledHeight,
        contentSingleScreenHeight,
      });
    }

    if (isAtBottom) {
      if (atBottomCallback !== null && atBottomCallback !== undefined) {
        atBottomCallback();
      }
    }
  }, 100);

  // 只会在组件首次挂载到DOM时触发
  // 如果组件使用了keep-alive，它在组件激活时不会再次触发
  onMounted(() => {
    if (scrollElementRef.value) {
      scrollElementRef.value.addEventListener("scroll", onScroll);
    }
  });

  onUnmounted(() => {
    if (scrollElementRef.value) {
      scrollElementRef.value.removeEventListener("scroll", onScroll);
    }
  });

  // 仅在组件使用了keep-alive并被重新激活时触发
  // 如果没有使用keep-alive，则永远不会触发
  onActivated(() => {
    if (scrollElementRef.value) {
      scrollElementRef.value.addEventListener("scroll", onScroll);
    }
  });

  onDeactivated(() => {
    if (scrollElementRef.value) {
      scrollElementRef.value.removeEventListener("scroll", onScroll);
    }
  });

  return scrollElementRef; // 暴露用于绑定到滚动的元素;
};