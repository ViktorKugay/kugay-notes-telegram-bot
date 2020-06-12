import locales from '../../locales/ru.json';
import chunk from 'lodash/chunk';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';

export const showResolvedOrUnresolved = buildTelegrafKeyboard([
  [locales.keyboards.tasks_type.resolved, locales.keyboards.tasks_type.unresolved],
]);

export const navigation = buildTelegrafKeyboard([
  [locales.keyboards.navigation.back, locales.keyboards.navigation.next],
]);

export const showOrCreate = buildTelegrafKeyboard([
  [locales.keyboards.tasks.show, locales.keyboards.tasks.create],
  [locales.keyboards.navigation.back],
]);

export const setNotificationDate = buildTelegrafKeyboard([
  [locales.keyboards.date.never],
  [locales.keyboards.date.today, locales.keyboards.date.tomorrow, locales.keyboards.date.after_tomorrow],
  [locales.keyboards.navigation.back],
]);

export const setNotificationTime = buildTelegrafKeyboard([
  [locales.keyboards.navigation.back],
  ...chunk(Object.keys(locales.keyboards.time), 3),
]);

export default {showOrCreate, setNotificationDate, setNotificationTime, navigation, showResolvedOrUnresolved};
