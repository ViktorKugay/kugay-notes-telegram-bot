import {User} from '../users/users.entity';
import {TelegrafContext} from 'telegraf/typings/context';
import {SceneContext} from 'telegraf/typings/stage';

export type TelegrafContextWithUser = TelegrafContext;

export enum TelegrafScene {
  main = 'main',
  date = 'date',
  tasks = 'tasks',
}

export type Scenes = any;

export interface UserSession {
  user: User;
  isCrateTaskMode: boolean;
}

export interface ProjectTelegrafContext extends TelegrafContext {
  scene: SceneContext<Scenes>;
  session: UserSession;
}
