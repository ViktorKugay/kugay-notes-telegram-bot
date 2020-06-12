import {ProjectTelegrafContext} from '../../telegram/telegram.types';
import {MiddlewareFn} from 'telegraf/typings/composer';
import Stage from 'telegraf/stage';
import {Stage as StageType} from 'telegraf/typings/stage';
import {Injectable} from '@nestjs/common';

import {TasksMainMenuScene} from '../scenes/tasks/tasks-main-menu/tasks-main-menu.scene';
import {TaskCreateScene} from '../scenes/tasks/task-create/task-create.scene';
import {TaskCreateSetTimeScene} from '../scenes/tasks/task-create-set-time/task-create-set-time.scene';
import {TaskCreateEndScene} from '../scenes/tasks/task-create-end/task-create-end.scene';
import {TaskCreateSetDateScene} from '../scenes/tasks/task-create-set-date/task-create-set-date.scene';
import {MainScene} from '../../scenes/scenes/main/main.scene';
import {TasksShowScene} from '../scenes/tasks/tasks-show/tasks-show.scene';
import {TasksShowMainMenuScene} from '../scenes/tasks/tasks-show-resolved/tasks-show-main-menu';

@Injectable()
export class StageMiddleware {
  public stage: StageType<ProjectTelegrafContext>;
  constructor(
    private readonly tasksMainMenuScene: TasksMainMenuScene,
    private readonly tasksCreateScene: TaskCreateScene,
    private readonly tasksCreateSetTimeScene: TaskCreateSetTimeScene,
    private readonly tasksCreateSetDateScene: TaskCreateSetDateScene,
    private readonly taskCreateEndScene: TaskCreateEndScene,
    private readonly mainScene: MainScene,
    private readonly tasksShowScene: TasksShowScene,
    private readonly tasksShowMainMenuScene: TasksShowMainMenuScene,
  ) {
    this.stage = new Stage([
      this.tasksMainMenuScene.scene,
      this.tasksCreateScene.scene,
      this.tasksCreateSetTimeScene.scene,
      this.tasksCreateSetDateScene.scene,
      this.taskCreateEndScene.scene,
      this.mainScene.scene,
      this.tasksShowScene.scene,
      this.tasksShowMainMenuScene.scene,
    ]);
  }

  public use = (): MiddlewareFn<ProjectTelegrafContext> => {
    return this.stage.middleware();
  };
}
