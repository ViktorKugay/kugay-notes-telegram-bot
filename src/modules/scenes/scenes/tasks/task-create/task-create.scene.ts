import {TelegrafScene, ProjectTelegrafContext, TelegrafListeners} from '../../../../telegram/telegram.types';
import {TasksService} from '../../../../tasks/tasks.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';

@Injectable()
export class TaskCreateScene extends SceneBase implements OnModuleInit {
  constructor(private readonly tasksService: TasksService) {
    super(TelegrafScene.task_create);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.on(TelegrafListeners.message, this.message);
  }

  private enter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.start);
  };

  private message = async (ctx: ProjectTelegrafContext) => {
    if (ctx.message) {
      await this.tasksService.createTask({content: ctx.message.text, user: ctx.session.user});
      ctx.scene.enter(TelegrafScene.task_create_set_date);
    }
  };
}
