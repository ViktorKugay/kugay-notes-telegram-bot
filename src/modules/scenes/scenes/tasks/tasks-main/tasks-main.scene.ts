import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';
import keyboards from '../tasks.keyboard';

@Injectable()
export class TasksMainScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_main);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.actions.create, this.toCreateTask);
    this.scene.hears(locales.keyboards.actions.show, this.toGetTask);
    this.scene.hears(locales.keyboards.actions.back, this.onBack);
  }

  private onBack = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.main);
  };

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.tasks.info, keyboards.showOrCreate);
  };

  private toCreateTask = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.task_create_set_task);
  };

  private toGetTask = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.tasks_get_main);
  };
}
