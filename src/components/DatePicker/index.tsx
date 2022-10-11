/**
 * Replacing Moment-js driven DatePicker with the one that works via DayJs
 * https://ant.design/docs/react/replace-moment
 */
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;