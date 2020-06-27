import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import errorNames from '../../../../common/error-names';
import {Alias} from '../../../../aliases/aliases.entity';
import {SceneBase} from '../../../../scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {aliasSceneMap} from '../aliases.keyboard';
import { CustomError } from 'src/utils/error';

@Injectable()
export class AliasesGetAliasesListScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.aliases_get_aliases_list);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    const aliases = ctx.session.user.aliases;

    const hasUserAliases = aliases.length > 0;
    if (hasUserAliases) {
      await this.showAliasesList(ctx, aliases);
    } else {
      await ctx.reply(locales.scenes.aliases.aliases_has_no_aliases);
    }

    await ctx.scene.enter(TelegrafScene.main, {
      prevScene: TelegrafScene.aliases_get_aliases_list,
    });
  };

  private showAliasesList = async (ctx: ProjectTelegrafContext, aliases: Alias[]) => {
    for (const alias of aliases) {
      await ctx.reply(this.buildAliasMessage(alias));
    }
  };

  private buildAliasMessage = (alias: Alias) => {
    const sceneName = Object.entries(aliasSceneMap).find(([_, TelegrafSceneName]) => alias.scene === TelegrafSceneName);
    if (!sceneName) {
      throw new CustomError(errorNames.UNRECOGNIZED_TELEGRAF_SCENE);
    }

    return `🛎 ${alias.alias} -> ${sceneName[0]}`;
  };
}
