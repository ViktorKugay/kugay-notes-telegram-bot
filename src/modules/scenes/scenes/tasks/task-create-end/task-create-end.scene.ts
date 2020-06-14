import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';

@Injectable()
export class TaskCreateEndScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.task_create_end);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    if (ctx.scene.state.prevScene === TelegrafScene.task_create_set_time) {
      ctx.reply(locales.scenes.tasks.tasks_end_with_notification);
    } else {
      ctx.reply(locales.scenes.tasks.tasks_end_without_notification);
    }

    ctx.scene.enter(TelegrafScene.main, {prevScene: TelegrafScene.task_create_end});
  };
}
