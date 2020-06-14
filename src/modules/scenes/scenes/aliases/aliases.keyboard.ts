import locales from '../../locales/ru.json';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';
import {TelegrafScene} from '../../../telegram/telegram.types.js';

export const aliasSceneMap: Record<string, TelegrafScene> = {
  'Создать задачу': TelegrafScene.task_create,
  'Показать задачи': TelegrafScene.tasks_show_main_menu,
};

export const showOrCreate = buildTelegrafKeyboard([[locales.keyboards.actions.create, locales.keyboards.actions.show]]);

export const createAlias = buildTelegrafKeyboard([Object.keys(aliasSceneMap)]);

export default {showOrCreate, createAlias};
