import {buildProxySocksAgent} from './helpers/buildProxySocksAgent';
import {StartMiddleware} from './middlewares/start.middleware';
import {TelegrafOptions} from 'telegraf/typings/telegraf';
import {ProjectTelegrafContext} from './telegram.types';
import {Telegraf, Middleware} from 'telegraf';
import {Injectable} from '@nestjs/common';
import {env, isProd} from '../../config';
import session from 'telegraf/session';
import {RouterMiddleware} from './middlewares/router.middleware';

const {TELEGRAM_ACCESS_TOKEN} = env;

@Injectable()
export class TelegramService {
  private telegraf: Telegraf<ProjectTelegrafContext>;

  constructor(private readonly startMiddleware: StartMiddleware, private readonly routerMiddleware: RouterMiddleware) {
    this.telegraf = new Telegraf(TELEGRAM_ACCESS_TOKEN, this.buildTelegrafOptions());
    // сессия должна инициализировать перед всеми остальными middlewares, иначе
    // сцены не успевают заинжектить свои состояния
    this.telegraf.use(session());
  }

  onModuleInit() {
    this.telegraf.start(this.startMiddleware.use);
    this.telegraf.use(this.routerMiddleware.use);
    this.telegraf.launch();
  }

  public notifyUserTask = async ({chatId, content}: {chatId: string; content: string}) => {
    this.getTelegram().sendMessage(chatId, content);
  };

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
