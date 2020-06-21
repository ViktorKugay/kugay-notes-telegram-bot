import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {buildTaskMessage} from '../tasks-get/helpers/buildTaskMessage';
import {hasTextMessage} from '../../../helpers/hasMessage';
import {QueueService} from '../../../../queue/queue.service';
import {TasksService} from '../../../../tasks/tasks.service';
import {hasChat} from '../../../helpers/hasChat';
import {Injectable, OnModuleInit} from '@nestjs/common';
import errorNames from '../../../../common/error-names';
import {CustomError} from '../../../../../utils/error';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';
import keyboards from '../tasks.keyboard';
import { buildNiticationDate } from '../tasks-create/helpers/buildNotificationDate';

@Injectable()
export class TaskStatusSetTimeScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService, private readonly queueService: QueueService) {
    super(TelegrafScene.tasks_status_delay_set_time);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(/\d\d:\d\d/, this.onSetTime);
    this.scene.hears(locales.keyboards.actions.back, this.onBack);
  }

  private onBack = async (ctx: ProjectTelegrafContext) => {
    return ctx.scene.enter(TelegrafScene.tasks_status_delay_set_date);
  };

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.tasks.tasks_set_time, keyboards.setTime);
  };

  private onSetTime = async (ctx: ProjectTelegrafContext) => {
    if (hasTextMessage(ctx) && hasChat(ctx)) {
      const task = await this.tasksService.updateLatestTaskByUser(ctx.session.user, {
        time: ctx.message.text,
      });

      await this.queueService.publishNotifyUserJob(
        ctx.chat.id,
        task.id,
        buildTaskMessage(task),
        buildNiticationDate(task.date, ctx.message.text),
      );

      await ctx.scene.enter(TelegrafScene.task_create_success, {
        prevScene: TelegrafScene.tasks_status_delay_set_time,
      });
    } else {
      throw new CustomError(errorNames.MISSING_CONTEXT_PROP);
    }
  };
}
