import {buildProxySocksAgent} from './helpers/buildProxySocksAgent';
import {TelegrafOptions} from 'telegraf/typings/telegraf';
import {ProjectTelegrafContext} from './telegram.types';
import {Injectable} from '@nestjs/common';
import {env, isProd} from '../../config';
import session from 'telegraf/session';
import {Telegraf} from 'telegraf';

import {AuthMiddleware} from './middlewares/auth.middleware';
import {StartMiddleware} from './middlewares/start.middleware';
import {StageMiddleware} from './middlewares/stage.middleware';

const {TELEGRAM_ACCESS_TOKEN} = env;

@Injectable()
export class TelegramService {
  private telegraf: Telegraf<ProjectTelegrafContext>;

  constructor(
    private readonly stageMiddleware: StageMiddleware,
    private readonly startMiddleware: StartMiddleware,
    private readonly authMiddleware: AuthMiddleware,
  ) {
    this.telegraf = new Telegraf(TELEGRAM_ACCESS_TOKEN, this.buildTelegrafOptions());
  }

  onModuleInit() {
    this.applyMiddlewares();
    this.telegraf.launch();
  }

  public getTelegram() {
    return this.telegraf.telegram;
  }

  private applyMiddlewares() {
    this.telegraf.use(session());
    this.telegraf.use(this.stageMiddleware.use);
    this.telegraf.use(this.authMiddleware.use);
    this.telegraf.start(this.startMiddleware.use);
  }

  private buildTelegrafOptions(): TelegrafOptions | undefined {
    if (!isProd) {
      return {
        telegram: {
          agent: buildProxySocksAgent(),
        },
      };
    }
  }
}
