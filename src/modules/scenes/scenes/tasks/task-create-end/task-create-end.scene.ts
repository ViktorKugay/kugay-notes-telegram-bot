import {TelegrafScene, ProjectTelegrafContext, EndSceneStatus} from '../../../../telegram/telegram.types';
import {QuotesService} from '../../../../quotes/quotes.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {SceneBase} from '../../../scene.base';
import locales from '../../../locales/ru.json';

@Injectable()
export class TaskCreateEndScene extends SceneBase implements OnModuleInit {
  constructor(private readonly quoteService: QuotesService) {
    super(TelegrafScene.task_create_end);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    await this.endSceneWithQuote(ctx, ctx.scene.state.taskCreateEnd);
    ctx.scene.enter(TelegrafScene.main);
  };

  private endSceneWithQuote = async (ctx: ProjectTelegrafContext, state: EndSceneStatus) => {
    if (state === EndSceneStatus.with_date) {
      ctx.reply(locales.scenes.tasks.end_with_notification);
    }

    if (state === EndSceneStatus.without_date) {
      ctx.reply(locales.scenes.tasks.end_without_notification);
    }

    ctx.reply(await this.quoteService.getQuoteString());
  };
}
