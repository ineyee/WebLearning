<template>
  <div class="house-section-component">
    <div class="header">{{ headerText }}</div>
    <div class="content">
      <slot name="content">
      </slot>
    </div>
    <div class="footer">
      <div class="text">{{ footerText }}</div>
      <div class="right-arrow"></div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "house-section-component"
});

defineProps({
  headerText: {
    type: String,
    default() {
      return "";
    },
  },
  footerText: {
    type: String,
    default() {
      return "";
    },
  },
});
</script>

<style lang="less" scoped>
.house-section-component {
  background-color: #fff;

  .header {
    height: 50px;
    padding: 0px 16px;
    border-top: 10px #eee solid;
    border-bottom: 1px #eee solid;

    font-size: 20px;
    font-weight: 600;
    color: #333;

    line-height: 50px;
  }

  .content {
    padding: 8px 16px;
  }

  .footer {
    height: 44px;
    padding: 0px 16px;

    display: flex;
    justify-content: end;
    align-items: center;

    .text {
      padding-right: 4px;

      font-size: 14px;
      color: var(--main-color);
      line-height: 44px;
    }

    .right-arrow {
      background: url("../../asset/image/sprite.png") no-repeat -238px -83px;
      width: 8px;
      height: 16px;
    }
  }
}
</style>