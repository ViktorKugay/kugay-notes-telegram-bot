import {TelegrafScene, ProjectTelegrafContext, TelegrafListeners} from '../../../../telegram/telegram.types';
import {AliasesService} from '../../../../aliases/aliases.service';
import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';

@Injectable()
export class AliasCreateSetAliasScene extends SceneBase implements OnModuleInit {
  constructor(private readonly aliasesService: AliasesService) {
    super(TelegrafScene.alias_create_set_alias);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.on(TelegrafListeners.message, this.message);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    await ctx.reply(locales.scenes.aliases.aliases_create_alias_set_alias);
  };

  public message = async (ctx: ProjectTelegrafContext) => {
    if (ctx.message) {
      await this.aliasesService.updateNewAlias(ctx.session.user, {alias: ctx.message.text});
      await ctx.reply(locales.scenes.aliases.aliases_create_alias_success);
      await ctx.scene.enter(TelegrafScene.main, {prevScene: TelegrafScene.alias_create_set_alias});
    }
  };
}
