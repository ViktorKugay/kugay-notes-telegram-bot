import {TelegrafScene, ProjectTelegrafContext} from '../../../telegram/telegram.types';
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
    this.scene.enter(this.entry);
    this.scene.hears(locales.keyboards.main.tasks, this.task);
    this.scene.hears(locales.keyboards.tasks.create, this.toTaskCreateScene);
    this.scene.hears(locales.keyboards.tasks.show, this.toTaskShowScene);
  }

  private entry = async (ctx: ProjectTelegrafContext) => {
    if (!ctx.scene.state.prevScene) {
      await ctx.reply(locales.scenes.main.welcome, keyboard.tasksOrNotes);
    } else {
      await ctx.reply(locales.scenes.main.continue, keyboard.tasksOrNotes);
    }
  };

  private task = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.tasks_main_menu);
  };

  private toTaskCreateScene = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.task_create);
  };

  private toTaskShowScene = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.tasks_show_main_menu);
  };
}
