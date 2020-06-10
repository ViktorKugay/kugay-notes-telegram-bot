import locales from '../../locales/ru.json';
import chunk from 'lodash/chunk';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';

export const showOrCreate = buildTelegrafKeyboard([
    [locales.keyboards.navigation.back],
    [locales.keyboards.tasks.create], 
    [locales.keyboards.tasks.show]
]);

export const setNotificationDate = buildTelegrafKeyboard([
    [locales.keyboards.date.never],
    [locales.keyboards.date.today],
    [locales.keyboards.date.tomorrow],
    [locales.keyboards.date.after_tomorrow],
    [locales.keyboards.navigation.back],
]);

export const setNotificationTime = buildTelegrafKeyboard([
    ...chunk(Object.keys(locales.keyboards.time), 3),
    [locales.keyboards.navigation.back],
]);

export default {showOrCreate, setNotificationDate, setNotificationTime};
