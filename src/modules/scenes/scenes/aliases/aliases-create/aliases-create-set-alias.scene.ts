import {TelegrafScene, ProjectTelegrafContext, TelegrafListeners} from '../../../../telegram/telegram.types';
import {AliasesService} from '../../../../aliases/aliases.service';
import {hasTextMessage} from '../../../helpers/hasMessage';
import {Injectable, OnModuleInit} from '@nestjs/common';
import errorNames from '../../../../common/error-names';
import {CustomError} from '../../../../../utils/error';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';

@Injectable()
export class AliasCreateSetAliasScene extends SceneBase implements OnModuleInit {
  constructor(private readonly aliasesService: AliasesService) {
    super(TelegrafScene.alias_create_set_alias);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.on(TelegrafListeners.message, this.onMessage);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.aliases.aliases_create_alias_set_alias);
  };

  public onMessage = async (ctx: ProjectTelegrafContext) => {
    if (hasTextMessage(ctx)) {
      await this.aliasesService.updateLatestAliasByUser(ctx.session.user, {
        alias: ctx.message.text,
      });

      await ctx.reply(locales.scenes.aliases.aliases_create_alias_success);

      await ctx.scene.enter(TelegrafScene.main, {
        prevScene: TelegrafScene.alias_create_set_alias,
      });
    } else {
      throw new CustomError(errorNames.MISSING_MESSAGE_TEXT_PROP);
    }
  };
}
