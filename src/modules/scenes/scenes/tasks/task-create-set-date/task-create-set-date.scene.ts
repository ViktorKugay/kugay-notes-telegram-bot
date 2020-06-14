import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {QueueService} from '../../../../queue/queue.service';
import {TasksService} from '../../../../tasks/tasks.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

const withoutNotificationsAction = locales.keyboards.date.never;
const setDateActions = [
  locales.keyboards.date.today,
  locales.keyboards.date.tomorrow,
  locales.keyboards.date.after_tomorrow,
];

@Injectable()
export class TaskCreateSetDateScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService, private readonly queueService: QueueService) {
    super(TelegrafScene.task_create_set_date);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(withoutNotificationsAction, this.toCreateTaskEndScene);
    this.scene.hears(setDateActions, this.setDate);
  }

  private enter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.tasks_set_date, keyboards.setNotificationDate);
  };

  private setDate = async (ctx: ProjectTelegrafContext) => {
    await this.tasksService.updateNewTask(ctx.session.user, {
      date: this.buildTaskDate(ctx.match),
    });

    ctx.scene.enter(TelegrafScene.task_create_set_time);
  };

  private toCreateTaskEndScene = async (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.task_create_end, {prevScene: TelegrafScene.task_create_set_date});
  };

  private buildTaskDate(date: any) {
    switch (date) {
      case locales.keyboards.date.today: {
        return new Date().toDateString();
      }

      case locales.keyboards.date.tomorrow: {
        const date = new Date();
        date.setDate(new Date().getDate() + 1);
        return date.toDateString();
      }

      case locales.keyboards.date.after_tomorrow: {
        const date = new Date();
        date.setDate(new Date().getDate() + 2);
        return date.toDateString();
      }

      default: {
        return new Date().toDateString();
      }
    }
  }
}
