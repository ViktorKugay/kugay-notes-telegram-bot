import {buildProxySocksAgent} from './helpers/buildProxySocksAgent';
import {StartMiddleware} from './middlewares/start.middleware';
import {TelegrafOptions} from 'telegraf/typings/telegraf';
import {ProjectTelegrafContext} from './telegram.types';
import {Telegraf, Middleware} from 'telegraf';
import {Injectable} from '@nestjs/common';
import {env, isProd} from '../../config';
import session from 'telegraf/session';

const {TELEGRAM_ACCESS_TOKEN} = env;

@Injectable()
export class TelegramService {
  private telegraf: Telegraf<ProjectTelegrafContext>;

  constructor(private readonly startMiddleware: StartMiddleware) {
    this.telegraf = new Telegraf(TELEGRAM_ACCESS_TOKEN, this.buildTelegrafOptions());
  }

  onModuleInit() {
    this.applyMiddleware(session());
    this.telegraf.start(this.startMiddleware.use);
    this.telegraf.launch();
  }

  public getTelegram() {
    return this.telegraf.telegram;
  }

  public applyMiddleware(middleware: Middleware<ProjectTelegrafContext>) {
    this.telegraf.use(middleware);
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
