/**
 * 将 UTC / ISO 时间格式化为中国时间
 * 输出示例：2026-01-03 星期六 21:40:42
 */
export function formatDateTime(
  date: string | number | Date,
  options?: {
    showWeek?: boolean;
    showTime?: boolean;
  },
) {
  const { showWeek = true, showTime = true } = options || {};

  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: showWeek ? 'long' : undefined,
    hour: showTime ? '2-digit' : undefined,
    minute: showTime ? '2-digit' : undefined,
    second: showTime ? '2-digit' : undefined,
  }).formatToParts(new Date(date));

  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));

  const dateStr = `${map.year}年${map.month}月${map.day}日`;
  const weekStr = showWeek ? ` ${map.weekday}` : '';
  const timeStr = showTime ? ` ${map.hour}:${map.minute}:${map.second}` : '';

  return `${dateStr}${weekStr}${timeStr}`;
}
