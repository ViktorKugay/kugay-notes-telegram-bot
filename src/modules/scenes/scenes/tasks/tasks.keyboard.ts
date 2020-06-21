import locales from '../../locales/ru.json';
import chunk from 'lodash/chunk';
import {buildTelegrafKeyboard, buildTelegrafMessageKeyboard} from '../../helpers/buildTelegrafKeyboard.js';

export const taskTypes = buildTelegrafKeyboard([
  [locales.keyboards.tasks.type.resolved, locales.keyboards.tasks.type.unresolved],
]);

export const navigation = buildTelegrafKeyboard([[locales.keyboards.actions.back, locales.keyboards.actions.next]]);

export const showOrCreate = buildTelegrafKeyboard([
  [locales.keyboards.actions.show, locales.keyboards.actions.create],
  [locales.keyboards.actions.back],
]);

export const setDate = buildTelegrafKeyboard([
  [locales.keyboards.date.never],
  [locales.keyboards.date.today, locales.keyboards.date.tomorrow, locales.keyboards.date.after_tomorrow],
  [locales.keyboards.actions.back],
]);

export const setTime = buildTelegrafKeyboard([
  [locales.keyboards.actions.back],
  ...buildTimeMarkup(locales.keyboards.time),
]);

export const setResolvedOrUnresolved = buildTelegrafMessageKeyboard([
  locales.keyboards.actions.resolve, locales.keyboards.actions.unresolve
])

export default {showOrCreate, setDate, setTime, navigation, taskTypes, setResolvedOrUnresolved};

function buildTimeMarkup(times: Record<string, string>) {
  return chunk(Object.keys(times), 3);
}
