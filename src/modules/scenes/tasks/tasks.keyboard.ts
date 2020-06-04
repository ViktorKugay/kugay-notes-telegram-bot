import locales from '../locales/ru.json';
import {buildTelegrafKeyboard} from '../helpers/buildTelegrafKeyboard.js';

export const showOrCreate = buildTelegrafKeyboard([[locales.keyboards.tasks.create], [locales.keyboards.tasks.show]]);

export default {showOrCreate};
