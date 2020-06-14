import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {buildTaskMessage} from '../tasks-show/helpers/buildTaskMessage';
import {QueueService} from '../../../../queue/queue.service';
import {TasksService} from '../../../../tasks/tasks.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

@Injectable()
export class TaskCreateSetTimeScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService, private readonly queueService: QueueService) {
    super(TelegrafScene.task_create_set_time);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(/\d\d:\d\d/, this.setTime);
    this.scene.hears(locales.keyboards.actions.back, this.back);
  }

  private back = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.task_create_set_date);
  };

  private enter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.tasks_set_time, keyboards.setNotificationTime);
  };

  private setTime = async (ctx: ProjectTelegrafContext) => {
    if (ctx.message && ctx.message.text && ctx.chat) {
      const task = await this.tasksService.updateNewTask(ctx.session.user, {time: ctx.message.text});
      const userTaskNotificationDate = this.buildNiticationDate(task.date, ctx.message.text);
      await this.queueService.publishNotifyUserJob(ctx.chat.id, buildTaskMessage(task), userTaskNotificationDate);

      ctx.scene.enter(TelegrafScene.task_create_end, {prevScene: TelegrafScene.task_create_set_time});
    }
  };

  // date - 2020/12/12; time - 13:00
  private buildNiticationDate = (date: string, time: string): Date => {
    const userNotification = new Date(date);
    userNotification.setHours(Number(time.split(':')[0]));

    return userNotification;
  };
}
