import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';
import keyboard from '../settings.keyboard';

@Injectable()
export class SettingsMainScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.settings_main);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.settings.aliases, this.toAliases);
  }

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.settings.settings_main_menu, keyboard.settingsMainMenu);
  };

  private toAliases = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.aliases_main);
  };
}
