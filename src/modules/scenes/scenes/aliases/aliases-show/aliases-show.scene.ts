import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Alias} from '../../../../aliases/aliases.entity';
import locales from '../../../locales/ru.json';

@Injectable()
export class AliasesShowScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.aliases_show);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    const aliases = ctx.session.user.aliases;
    if (aliases.length) {
      await this.showAliasesList(aliases, ctx);
    } else {
      await ctx.reply(locales.scenes.aliases.aliases_has_no_aliases);
      await ctx.scene.enter(TelegrafScene.main, {prevScene: TelegrafScene.aliases_show});
    }
  };

  private showAliasesList = async (aliases: Alias[], ctx: ProjectTelegrafContext) => {
    for (const alias of aliases) {
      await ctx.reply(this.buildAliasMessage(alias));
      await ctx.scene.enter(TelegrafScene.main, {prevScene: TelegrafScene.aliases_show});
    }
  };

  private buildAliasMessage = (alias: Alias) => {
    return `🛎 ${alias.alias} -> ${alias.scene}`;
  };
}
