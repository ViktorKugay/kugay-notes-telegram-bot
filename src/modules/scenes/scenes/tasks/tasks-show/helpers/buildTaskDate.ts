import {parseDate} from '../../../../../../utils/parseDate';

export function buildTaskDate(date: string, time: string) {
  if (date && time) {
    const {month, day, year, hour, minute} = parseDate(new Date(`${date} ${time}`));

    return `🗓 ${day}.${month}.${year} ⏱${hour}:${minute}`;
  } else {
    return '';
  }
}
