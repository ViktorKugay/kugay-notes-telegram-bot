import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

@Injectable()
export class TasksMainMenuScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_main_menu);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(locales.keyboards.actions.create, this.toTaskCreateScene);
    this.scene.hears(locales.keyboards.actions.show, this.toTaskShowScene);
    this.scene.hears(locales.keyboards.actions.back, this.back);
  }

  private back = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.main);
  };

  private enter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.info, keyboards.showOrCreate);
  };

  private toTaskCreateScene = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.task_create);
  };

  private toTaskShowScene = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.tasks_show);
  };
}
