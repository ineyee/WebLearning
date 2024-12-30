import dayjs from "dayjs";

// 获取某个日期[date]的毫秒时间戳
export function getTimestampMsOf(date) {
  return date.getTime();
}

// 获取当前日期的毫秒时间戳
export function getCurDateTimestampMs() {
  return getTimestampMsOf(new Date());
}

// 格式化毫秒时间戳[timestampMs]为指定格式[formatter]的时间字符串
export function formatTimestampMs(formatter, timestampMs) {
  return dayjs(timestampMs).format(formatter);
}

// 计算两个毫秒时间戳之间相差的天数
export function diffDays(date1TimestampMs, date2TimestampMs) {
  const date1 = dayjs(date1TimestampMs);
  const date2 = dayjs(date2TimestampMs);
  return date2.diff(date1, "days");
}