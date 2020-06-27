import {User} from '../users/users.entity';
import {TelegrafContext} from 'telegraf/typings/context';
import {SceneContext} from 'telegraf/typings/stage';

export type TelegrafContextWithUser = TelegrafContext;

export enum TelegrafScene {
 // ==== Error Handling ====
 error_handling = 'error_handling',

  // ===== Main Menu =====
  main = 'main',

  // ====== Tasks ======
  tasks_main = 'tasks_main',

  // ======= Tasks Get
  tasks_get_main = 'tasks_get_main',
  tasks_get_tasks_list = 'tasks_get_tasks_list',

  // ===== Tasks Create =====
  task_create_set_task = 'task_create_set_task',
  task_create_set_date = 'task_create_set_date',
  task_create_set_time = 'task_create_set_time',
  task_create_success = 'task_create_success',

  // ===== Tasks Status ======
  tasks_status_resolve = 'tasks_status_resolve',
  tasks_status_delay_set_status = 'tasks_status_delay_set_status',
  tasks_status_delay_set_date = 'tasks_status_delay_set_date',
  tasks_status_delay_set_time = 'tasks_status_delay_set_time',

  // ====== Aliases ======
  aliases_main = 'aliases_main',
  alias_create_set_scene = 'alias_craete_set_scene',
  alias_create_set_alias = 'alias_create_set_alias',
  aliases_get_aliases_list = 'aliases_get_aliases_list',
  alias_delete_alias = 'alias_delete_alias',

  // ====== Settings ======
  settings_main = 'settings_main',
}

export type Scenes = any;

export enum TelegrafListeners {
  message = 'message',
}

export interface UserSession {
  user: User;
}

export enum TaskStatus {
  resolved = 'resolved',
  unresolved = 'unresolved',
}

export interface SceneWithState extends SceneContext<Scenes> {
  state: {
    aliasId: string;
    taskId: string;
    action: 'resolve_task' | 'delay_task' | 'delete_task' | 'delete_alias';
    prevScene: TelegrafScene;
    taskStatus: TaskStatus | undefined;
  };
}

export interface ProjectTelegrafContext extends TelegrafContext {
  scene: SceneWithState;
  session: UserSession;
}
