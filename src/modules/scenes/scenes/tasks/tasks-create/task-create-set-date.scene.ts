import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {TasksService} from '../../../../tasks/tasks.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {buildTaskDate} from './helpers/buildTaskDate';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

const setDate = [locales.keyboards.date.today, locales.keyboards.date.tomorrow, locales.keyboards.date.after_tomorrow];

@Injectable()
export class TaskCreateSetDateScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService) {
    super(TelegrafScene.task_create_set_date);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(setDate, this.onSetDate);
    this.scene.hears(locales.keyboards.actions.back, this.onBack);
    this.scene.hears(locales.keyboards.date.never, this.toSuccess);
  }

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.tasks.tasks_set_date, keyboards.setDate);
  };

  private onSetDate = async (ctx: ProjectTelegrafContext) => {
    await this.tasksService.updateLatestTaskByUser(ctx.session.user, {
      date: buildTaskDate(ctx.match),
    });

    return await ctx.scene.enter(TelegrafScene.task_create_set_time, {
      prevScene: TelegrafScene.task_create_set_date,
    });
  };

  private onBack = async (ctx: ProjectTelegrafContext) => {
    await this.tasksService.removeLatestUserTask(ctx.session.user);

    return await ctx.scene.enter(ctx.scene.state.prevScene);
  };

  private toSuccess = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.task_create_success, {
      prevScene: TelegrafScene.task_create_set_date,
    });
  };
}
