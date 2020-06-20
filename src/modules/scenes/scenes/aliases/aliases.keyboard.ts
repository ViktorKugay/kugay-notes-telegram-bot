import locales from '../../locales/ru.json';
import {buildTelegrafKeyboard} from '../../helpers/buildTelegrafKeyboard.js';
import {TelegrafScene} from '../../../telegram/telegram.types.js';

export const aliasSceneMap: Record<string, TelegrafScene> = {
  'Создать задачу': TelegrafScene.task_create_set_task,
  'Показать задачи': TelegrafScene.tasks_get_main,
};

export const showOrCreate = buildTelegrafKeyboard([[locales.keyboards.actions.create, locales.keyboards.actions.show]]);

export const createAlias = buildTelegrafKeyboard([Object.keys(aliasSceneMap)]);

export default {showOrCreate, createAlias};
