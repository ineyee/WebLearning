<!-- 这个component我们就采用stateful的方式，即所有的状态都放在它内部，而不是抽取到viewModel里 -->
<template>
  <div class="date-component">
    <div class="date-info" @click="_onClickDateInfo">
      <div class="date begin">
        <div class="text">入住</div>
        <div>{{ _beginDateString }}</div>
      </div>
      <div>共{{ _totalNight }}晚</div>
      <div class="date end">
        <div class="text">离店</div>
        <div>{{ _endDateString }}</div>
      </div>
    </div>
    <van-calendar v-model:show="_showCalendar" type="range" color="#FF9854FF" :formatter="_formatter"
      @confirm="_onConfirm" />
  </div>
</template>

<script setup>
import { getTimestampMsOf, getCurDateTimestampMs, formatTimestampMs, diffDays } from '@/util/date-util';
import { ref } from 'vue';

defineOptions({
  name: "date-component"
});

const props = defineProps({
  onConfirm: {
    type: Function,
    default: null,
  },
});

// 日期信息
// UI上不展示这两个变量，也就是说这两个变量不直接驱动UI，所以可以定义成非响应式的
let _beginDateTimestampMs = getCurDateTimestampMs();
let _endDateTimestampMs = getCurDateTimestampMs() + 24 * 60 * 60 * 1000;
// UI上展示的是这两个变量，也就是说这两个变量直接驱动UI，所以得定义成响应式的
let _beginDateString = ref(formatTimestampMs("MM月DD日", _beginDateTimestampMs));
let _endDateString = ref(formatTimestampMs("MM月DD日", _endDateTimestampMs));
let _totalNight = ref(diffDays(_beginDateTimestampMs, _endDateTimestampMs));
const _onClickDateInfo = () => {
  _showCalendar.value = true;
};
if (props.onConfirm !== null) {
  props.onConfirm(_beginDateString, _endDateString);
}

// 日历
let _showCalendar = ref(false);
const _formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
};
const _onConfirm = (days) => {
  _showCalendar.value = false;
  _beginDateTimestampMs = getTimestampMsOf(days[0]);
  _endDateTimestampMs = getTimestampMsOf(days[1]);
  _beginDateString.value = formatTimestampMs("MM月DD日", _beginDateTimestampMs);
  _endDateString.value = formatTimestampMs("MM月DD日", _endDateTimestampMs);
  _totalNight.value = diffDays(_beginDateTimestampMs, _endDateTimestampMs);

  if (props.onConfirm !== null) {
    props.onConfirm(_beginDateString, _endDateString);
  }
};
</script>

<style lang="less" scoped>
.date-component {
  padding: 10px 20px 10px 20px;

  .date-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .date {
      display: flex;
      flex-direction: column;

      .text {
        font-size: 12px;
        color: var(--c-666666FF);
      }
    }

    .begin {
      align-items: start;
    }

    .end {
      align-items: end;
    }
  }
}
</style>