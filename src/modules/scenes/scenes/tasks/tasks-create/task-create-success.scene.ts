import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';

@Injectable()
export class TaskCreateSuccessScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.task_create_success);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    const isPrevSceneIsSetTime = ctx.scene.state.prevScene === TelegrafScene.task_create_set_time;
    if (isPrevSceneIsSetTime) {
      await ctx.reply(locales.scenes.tasks.tasks_end_with_notification);
    } else {
      await ctx.reply(locales.scenes.tasks.tasks_end_without_notification);
    }

    return await ctx.scene.enter(TelegrafScene.main, {prevScene: TelegrafScene.task_create_success});
  };
}
