import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue';

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
export function useElementScroll({scrollingCallback, atBottomCallback}) {
  // 函数里定义的是局部变量，所以不能直接返回非引用类型的数据，否则函数调用结束后局部变量就销毁了，会发生坏内存访问，需要返回引用
  const scrollElementRef = ref(null); // 用于绑定到滚动的元素

  const onScroll = (event) => {
    const element = event.target;

    const contentTotalHeight = element.scrollHeight; // 内容的总高度
    const contentScrolledHeight = element.scrollTop; // 内容已滚动的高度
    const contentSingleScreenHeight = element.clientHeight; // 单屏能显示下的内容高度
    const isAtBottom =
      contentScrolledHeight.value + contentSingleScreenHeight.value >= contentTotalHeight.value;

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
  };

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