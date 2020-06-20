import {TelegrafScene, ProjectTelegrafContext, TelegrafListeners} from '../../../../telegram/telegram.types';
import {hasTextMessage} from '../../../../scenes/helpers/hasMessage';
import {TasksService} from '../../../../tasks/tasks.service';
import {CustomError} from '../../../../../utils/error';
import {Injectable, OnModuleInit} from '@nestjs/common';
import errorNames from '../../../../common/error-names';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';

@Injectable()
export class TaskCreateSetTaskScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService) {
    super(TelegrafScene.task_create_set_task);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.on(TelegrafListeners.message, this.onMessage);
  }

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.tasks.tasks_create);
  };

  private onMessage = async (ctx: ProjectTelegrafContext) => {
    if (hasTextMessage(ctx)) {
      await this.tasksService.createTask({
        content: ctx.message.text,
        user: ctx.session.user,
      });

      return await ctx.scene.enter(TelegrafScene.task_create_set_date, {
        prevScene: TelegrafScene.task_create_set_task,
      });
    } else {
      throw new CustomError(errorNames.MISSING_MESSAGE_TEXT_PROP);
    }
  };
}
