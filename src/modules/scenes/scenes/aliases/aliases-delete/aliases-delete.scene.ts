import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {AliasesService} from '../../../../aliases/aliases.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';

@Injectable()
export class AliasDeleteAliasScene extends SceneBase implements OnModuleInit {
  constructor(private readonly aliasesService: AliasesService) {
    super(TelegrafScene.alias_delete_alias);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    if (ctx.scene.state && ctx.scene.state.action === 'delete_alias') {
        const aliasId = ctx.scene.state.aliasId;
        await this.aliasesService.removeAlias(aliasId);

        return await ctx.reply(locales.scenes.aliases.aliase_delete);
    }
  };
}
