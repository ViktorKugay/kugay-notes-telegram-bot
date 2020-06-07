import locales from '../../locales/ru.json';
import chunk from 'lodash/chunk';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';

export const showOrCreate = buildTelegrafKeyboard([
    [locales.keyboards.tasks.create], 
    [locales.keyboards.tasks.show]
]);

export const setNotificationDate = buildTelegrafKeyboard([
    [locales.keyboards.date.never],
    [locales.keyboards.date.today],
    [locales.keyboards.date.tomorrow],
    [locales.keyboards.date.after_tomorrow]
]);

export const setNotificationTime = buildTelegrafKeyboard(chunk(Object.keys(locales.keyboards.time), 3));

export default {showOrCreate, setNotificationDate, setNotificationTime};
