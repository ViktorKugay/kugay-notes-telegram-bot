import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard';
import locales from '../../locales/ru.json';

export const tasksOrNotes = buildTelegrafKeyboard([
  [locales.keyboards.main.notes, locales.keyboards.main.tasks],
  [locales.keyboards.main.notes, locales.keyboards.tasks.create],
  [locales.keyboards.main.notes, locales.keyboards.tasks.show],
]);

export default {tasksOrNotes};
