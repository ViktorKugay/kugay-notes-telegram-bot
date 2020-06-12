import {User} from '../users/users.entity';
import {TelegrafContext} from 'telegraf/typings/context';
import {SceneContext} from 'telegraf/typings/stage';

export type TelegrafContextWithUser = TelegrafContext;

export enum TelegrafScene {
  main = 'main',
  tasks_main_menu = 'tasks_main_menu',
  tasks_show_main_menu = 'tasks_show_main_menu',
  tasks_show = 'tasks_show',
  task_create = 'task_create',
  task_create_set_date = 'task_create_set_date',
  task_create_set_time = 'task_create_set_time',
  task_create_end = 'task_create_end',
}

export type Scenes = any;

export enum TelegrafListeners {
  message = 'message',
}

export interface UserSession {
  user: User;
  isCrateTaskMode: boolean;
  isSetTimeMode: boolean;
  taskData: {
    date: string;
  };
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
