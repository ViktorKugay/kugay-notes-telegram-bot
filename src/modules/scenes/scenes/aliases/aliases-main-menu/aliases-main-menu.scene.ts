import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import keyboards from '../aliases.keyboard';
import locales from '../../../locales/ru.json';

@Injectable()
export class AliasesMainMenuScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.aliases_main_menu);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(locales.keyboards.actions.create, this.toCreateAlias);
    this.scene.hears(locales.keyboards.actions.show, this.toShowAliases);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.aliases.aliases_mane_menu, keyboards.showOrCreate);
  };

  public toShowAliases = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.aliases_show);
  };

  public toCreateAlias = (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.alias_create_set_scene);
  };
}
