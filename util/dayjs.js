import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
// RelativeTime 增加了 .from .to .fromNow .toNow 4个 API 来展示相对的时间 (e.g. 3 小时以前).
dayjs.extend(relativeTime);

export { dayjs };
