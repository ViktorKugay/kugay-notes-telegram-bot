import {TelegrafScene, ProjectTelegrafContext} from '../../../telegram/telegram.types';
import {hasPrevScene} from '../../helpers/hasPrevScene';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../scene.base';
import locales from '../../locales/ru.json';
import keyboard from './main.keyboard';

@Injectable()
export class MainScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.main);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.main.tasks, this.toTasksMain);
    this.scene.hears(locales.keyboards.actions.create, this.toCreateTask);
    this.scene.hears(locales.keyboards.actions.show, this.toGetTasks);
    this.scene.hears(locales.keyboards.settings.info, this.toSettings);
  }

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    if (!hasPrevScene(ctx)) {
      await ctx.reply(locales.scenes.main.welcome, keyboard.tasksOrNotes);
    }
  };

  private toTasksMain = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.tasks_main);
  };

  private toCreateTask = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.task_create_set_task);
  };

  private toGetTasks = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.tasks_get_main);
  };

  private toSettings = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.settings_main);
  };
}
