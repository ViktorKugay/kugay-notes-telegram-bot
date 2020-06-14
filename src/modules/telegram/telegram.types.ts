import {User} from '../users/users.entity';
import {TelegrafContext} from 'telegraf/typings/context';
import {SceneContext} from 'telegraf/typings/stage';

export type TelegrafContextWithUser = TelegrafContext;

export enum TelegrafScene {
  main = 'main',

  // ====== Tasks ======
  tasks_main_menu = 'tasks_main_menu',
  tasks_show_main_menu = 'tasks_show_main_menu',
  tasks_show = 'tasks_show',

  // ===== Tasks Create =====
  task_create = 'task_create',
  task_create_set_date = 'task_create_set_date',
  task_create_set_time = 'task_create_set_time',
  task_create_end = 'task_create_end',

  // ====== Aliases ======
  aliases_main_menu = 'alias_main_menu',
  alias_create_set_scene = 'alias_craete_set_scene',
  alias_create_set_alias = 'alias_create_set_alias',
  aliases_show = 'aliases_show',

  // ====== Settings ======
  settings_main_menu = 'settings_main_menu',
}

export type Scenes = any;

export enum TelegrafListeners {
  message = 'message',
}

export interface UserSession {
  user: User;
}

export enum ShowTaskType {
  resolved = 'resolved',
  unresolved = 'unresolved',
}

interface SceneWithState extends SceneContext<Scenes> {
  state: {
    prevScene: TelegrafScene;
    showTaskType: ShowTaskType;
  };
}

export interface ProjectTelegrafContext extends TelegrafContext {
  scene: SceneWithState;
  session: UserSession;
}
