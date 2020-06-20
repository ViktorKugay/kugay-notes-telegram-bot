import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';
import keyboards from '../aliases.keyboard';

@Injectable()
export class AliasesMainScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.aliases_main);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.actions.create, this.toCreateAlias);
    this.scene.hears(locales.keyboards.actions.show, this.toGetAliases);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.aliases.aliases_mane_menu, keyboards.showOrCreate);
  };

  public toGetAliases = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.aliases_get_aliases_list);
  };

  public toCreateAlias = async (ctx: ProjectTelegrafContext) => {
    return await ctx.scene.enter(TelegrafScene.alias_create_set_scene);
  };
}
