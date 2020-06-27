import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard';
import locales from '../../locales/ru.json';

// export const tasksOrNotes = buildTelegrafKeyboard([
//   [locales.keyboards.main.notes, locales.keyboards.main.tasks],
//   [locales.keyboards.main.notes, locales.keyboards.actions.create],
//   [locales.keyboards.main.notes, locales.keyboards.actions.show],
//   [locales.keyboards.settings.info],
// ]);

export const tasksOrNotes = buildTelegrafKeyboard([
  [locales.keyboards.main.tasks],
  [locales.keyboards.actions.create],
  [locales.keyboards.actions.show],
  [locales.keyboards.settings.info],
]);

export default {tasksOrNotes};
