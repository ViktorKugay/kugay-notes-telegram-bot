import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegrafScene, ProjectTelegrafContext, TelegrafListeners} from '../../../../telegram/telegram.types';
import keyboards from '../aliases.keyboard';
import {aliasSceneMap} from '../aliases.keyboard';
import locales from '../../../locales/ru.json';
import {AliasesService} from '../../../../aliases/aliases.service';

@Injectable()
export class AliasCreateSetSceneScene extends SceneBase implements OnModuleInit {
  constructor(private readonly aliasesService: AliasesService) {
    super(TelegrafScene.alias_create_set_scene);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(Object.keys(aliasSceneMap), this.setScene);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.aliases.aliases_create_alias_set_scene, keyboards.createAlias);
  };

  public setScene = async (ctx: ProjectTelegrafContext) => {
    if (ctx.message && ctx.message.text) {
      await this.aliasesService.createAlias(aliasSceneMap[ctx.message.text], ctx.session.user);

      ctx.scene.enter(TelegrafScene.alias_create_set_alias);
    }
  };
}
