import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import keyboard from '../settings.keyboard';
import {SceneBase} from '../../../scene.base.js';
import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types.js';

@Injectable()
export class SettingsMainMenuScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.settings_main_menu);
  }

  onModuleInit() {
    this.scene.enter(this.entry);
    this.scene.hears(locales.keyboards.settings.aliases, this.toAliasesScene);
  }

  private entry = async (ctx: ProjectTelegrafContext) => {
    if (!ctx.scene.state.prevScene) {
      await ctx.reply(locales.scenes.main.welcome, keyboard.settingsMainMenu);
    }
  };

  private toAliasesScene = async (ctx: ProjectTelegrafContext) => {
    await ctx.scene.enter(TelegrafScene.aliases_main_menu);
  };
}
