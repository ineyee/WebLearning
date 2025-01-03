<template>
  <div class="house-info-component">
    <van-text-ellipsis class="house-name" :content="curHouseInfo.houseName" :rows="3" />
    <div class="house-tag-list">
      <template v-for="tag in curHouseInfo.houseTags" :key="tag.tagCode">
        <!-- 服务端传过来的样式只能放在内联样式里做，不能放到下面的style元素里做 -->
        <template v-if="tag?.tagText !== null">
          <div class="house-tag"
            :style="{ color: tag?.tagText?.color, backgroundColor: tag?.tagText?.background?.color }">
            {{ tag?.tagText?.text }}
          </div>
        </template>
      </template>
    </div>
    <div class="comment">
      <div class="comment-info">
        <div class="overall">{{ curHouseInfo.commentBrief?.overall }}</div>
        <div class="score-title">{{ curHouseInfo.commentBrief?.scoreTitle }}</div>
        <div class="comment-brief">"{{ curHouseInfo.commentBrief?.commentBrief }}"</div>
      </div>
      <div class="total-count">
        <div class="count">{{ curHouseInfo.commentBrief?.totalCount }}条评论</div>
        <div class="right-arrow"></div>
      </div>
    </div>

    <div class="near-by-position">
      <div class="address">
        {{ curHouseInfo.nearByPosition?.address }}
      </div>
      <div class="map">
        <div class="tip">地图</div>
        <div class="right-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "house-info-component"
});

defineProps({
  curHouseInfo: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped>
.house-info-component {
  padding: 12px 16px;
  background-color: #fff;

  .house-name {
    font-weight: 600;
    font-size: 16px;
    color: #333;
  }

  .house-tag-list {
    margin-top: 10px;
    margin-bottom: 12px;

    display: flex;
    flex-wrap: wrap;

    .house-tag {
      padding: 2px 4px;
      margin: 0px 4px 12px 0px;
      border-radius: 2px;

      font-size: 10px;
      text-align: center;
    }
  }

  .comment {
    padding: 8px;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 12px;

    background-color: #f7f8fc;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .comment-info {
      display: flex;
      justify-content: start;
      align-items: center;

      .overall {
        padding-right: 2px;

        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      .score-title {
        padding-right: 2px;

        font-weight: 700;
        color: #333;
      }

      .comment-brief {
        color: #666;
      }
    }

    .total-count {
      display: flex;
      justify-content: end;
      align-items: center;


      .count {
        padding-right: 4px;

        color: var(--main-color);
      }
    }
  }

  .near-by-position {
    padding: 8px;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 12px;

    background-color: #f7f8fc;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .address {
      font-weight: 700;
      color: #333;
    }

    .map {
      display: flex;
      justify-content: end;
      align-items: center;

      .tip {
        padding-right: 4px;

        color: var(--main-color);
      }
    }
  }

  .right-arrow {
    background: url("../../asset/image/sprite.png") no-repeat -238px -83px;
    width: 8px;
    height: 16px;
  }
}
</style>