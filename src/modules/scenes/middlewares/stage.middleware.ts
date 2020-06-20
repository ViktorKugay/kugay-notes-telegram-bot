import {ProjectTelegrafContext} from '../../telegram/telegram.types';
import {MiddlewareFn} from 'telegraf/typings/composer';
import Stage from 'telegraf/stage';
import {Stage as StageType} from 'telegraf/typings/stage';
import {Injectable} from '@nestjs/common';

import {TasksMainScene} from '../scenes/tasks/tasks-main/tasks-main.scene';
import {TaskCreateSetTaskScene} from '../scenes/tasks/tasks-create/task-create-set-task.scene';
import {TaskCreateSetTimeScene} from '../scenes/tasks/tasks-create/task-create-set-time.scene';
import {TaskCreateSuccessScene} from '../scenes/tasks/tasks-create/task-create-success.scene';
import {TaskCreateSetDateScene} from '../scenes/tasks/tasks-create/task-create-set-date.scene';
import {MainScene} from '../../scenes/scenes/main/main.scene';
import {TasksGetTasksListScene} from '../scenes/tasks/tasks-get/tasks-get-tasks-list.scene';
import {TasksGetMainScene} from '../scenes/tasks/tasks-get/tasks-get-main';
import {AliasesGetAliasesListScene} from '../scenes/aliases/aliases-get/aliases-get-aliases-list.scene';
import {AliasCreateSetSceneScene} from '../scenes/aliases/aliases-create/aliases-create-set-scene.scene';
import {AliasCreateSetAliasScene} from '../scenes/aliases/aliases-create/aliases-create-set-alias.scene';
import {AliasesMainScene} from '../scenes/aliases/aliases-main/aliases-main-menu.scene';
import {SettingsMainScene} from '../scenes/settings/settings-main/settings-main.scene';

@Injectable()
export class StageMiddleware {
  public stage: StageType<ProjectTelegrafContext>;
  constructor(
    private readonly tasksMainScene: TasksMainScene,
    private readonly taskCreateSetTaskScene: TaskCreateSetTaskScene,
    private readonly tasksCreateSetTimeScene: TaskCreateSetTimeScene,
    private readonly tasksCreateSetDateScene: TaskCreateSetDateScene,
    private readonly taskCreateSuccessScene: TaskCreateSuccessScene,
    private readonly mainScene: MainScene,
    private readonly tasksGetTasksListScene: TasksGetTasksListScene,
    private readonly TasksGetMainScene: TasksGetMainScene,
    private readonly aliasesGetAliasesListScene: AliasesGetAliasesListScene,
    private readonly aliasCreateSetAliasScene: AliasCreateSetAliasScene,
    private readonly aliasCreateSetSceneScene: AliasCreateSetSceneScene,
    private readonly aliasesMainScene: AliasesMainScene,
    private readonly settingsMainScene: SettingsMainScene,
  ) {
    this.stage = new Stage([
      this.tasksMainScene.scene,
      this.taskCreateSetTaskScene.scene,
      this.tasksCreateSetTimeScene.scene,
      this.tasksCreateSetDateScene.scene,
      this.taskCreateSuccessScene.scene,
      this.mainScene.scene,
      this.tasksGetTasksListScene.scene,
      this.TasksGetMainScene.scene,
      this.aliasesMainScene.scene,
      this.aliasCreateSetSceneScene.scene,
      this.aliasCreateSetAliasScene.scene,
      this.aliasesGetAliasesListScene.scene,
      this.settingsMainScene.scene,
    ]);
  }

  public use = (): MiddlewareFn<ProjectTelegrafContext> => {
    return this.stage.middleware();
  };
}
