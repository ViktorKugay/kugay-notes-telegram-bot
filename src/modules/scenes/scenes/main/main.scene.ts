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
    this.scene.enter(this.onEntry);
    this.scene.hears(locales.keyboards.main.tasks, this.onHearTask);
  }

  private onEntry = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.main.welcome, keyboard.tasksOrNotes);
  };

  private onHearTask = (ctx: ProjectTelegrafContext) => {
    ctx.scene.leave();
    ctx.scene.enter(TelegrafScene.tasks);
  };
}
