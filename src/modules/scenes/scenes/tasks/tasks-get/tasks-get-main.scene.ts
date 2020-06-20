import {TelegrafScene, ProjectTelegrafContext, TaskStatus} from '../../../../telegram/telegram.types';
import {SceneBase} from '../../../scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

@Injectable()
export class TasksGetMainScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_get_main);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.tasks.type.resolved, this.toGetResolvedTasks);
    this.scene.hears(locales.keyboards.tasks.type.unresolved, this.toGetUnresolvedTasks);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.tasks.tasks_select_task_type, keyboards.taskTypes);
  };

  public toGetResolvedTasks = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.tasks_get_tasks_list, {
      taskStatus: TaskStatus.resolved,
    });
  };

  public toGetUnresolvedTasks = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.tasks_get_tasks_list, {
      taskStatus: TaskStatus.unresolved,
    });
  };
}
