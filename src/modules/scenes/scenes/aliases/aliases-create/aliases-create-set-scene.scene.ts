import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {AliasesService} from '../../../../aliases/aliases.service';
import {hasTextMessage} from '../../../helpers/hasMessage';
import {CustomError} from '../../../../../utils/error';
import {SceneBase} from '../../../../scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import errorNames from '../../../../common/error-names';
import {aliasSceneMap} from '../aliases.keyboard';
import locales from '../../../locales/ru.json';
import keyboards from '../aliases.keyboard';

@Injectable()
export class AliasCreateSetSceneScene extends SceneBase implements OnModuleInit {
  constructor(private readonly aliasesService: AliasesService) {
    super(TelegrafScene.alias_create_set_scene);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(Object.keys(aliasSceneMap), this.onSetScene);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    return await ctx.reply(locales.scenes.aliases.aliases_create_alias_set_scene, keyboards.createAlias);
  };

  public onSetScene = async (ctx: ProjectTelegrafContext) => {
    if (hasTextMessage(ctx)) {
      await this.aliasesService.createAlias(aliasSceneMap[ctx.message.text], ctx.session.user);

      return await ctx.scene.enter(TelegrafScene.alias_create_set_alias);
    } else {
      throw new CustomError(errorNames.MISSING_MESSAGE_TEXT_PROP);
    }
  };
}
