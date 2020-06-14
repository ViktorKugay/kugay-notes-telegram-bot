import locales from '../../locales/ru.json';
import chunk from 'lodash/chunk';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';

export const showResolvedOrUnresolved = buildTelegrafKeyboard([
  [locales.keyboards.tasks.type.resolved, locales.keyboards.tasks.type.unresolved],
]);

export const navigation = buildTelegrafKeyboard([[locales.keyboards.actions.back, locales.keyboards.actions.next]]);

export const showOrCreate = buildTelegrafKeyboard([
  [locales.keyboards.actions.show, locales.keyboards.actions.create],
  [locales.keyboards.actions.back],
]);

export const setNotificationDate = buildTelegrafKeyboard([
  [locales.keyboards.date.never],
  [locales.keyboards.date.today, locales.keyboards.date.tomorrow, locales.keyboards.date.after_tomorrow],
  [locales.keyboards.actions.back],
]);

export const setNotificationTime = buildTelegrafKeyboard([
  [locales.keyboards.actions.back],
  ...chunk(Object.keys(locales.keyboards.time), 3),
]);

export default {showOrCreate, setNotificationDate, setNotificationTime, navigation, showResolvedOrUnresolved};
