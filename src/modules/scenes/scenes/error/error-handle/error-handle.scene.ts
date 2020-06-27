import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {SceneBase} from '../../../../scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';

@Injectable()
export class ErrorHandleScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.error_handling);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    await ctx.reply(locales.scenes.error.catch);

    return await ctx.scene.enter(TelegrafScene.main, {
        prevScene: TelegrafScene.error_handling
    });
  };
}
