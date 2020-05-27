import {Telegraf} from 'telegraf';
import {env, isProd} from '../../config';
import {Injectable} from '@nestjs/common';
import {TelegrafContext} from 'telegraf/typings/context';
import {buildProxySocksAgent} from './utils/buildProxySocksAgent';

const {TELEGRAM_ACCESS_TOKEN} = env;

@Injectable()
export class TelegramService {
  private readonly telegraf: Telegraf<TelegrafContext>;

  constructor() {
    this.telegraf = new Telegraf(TELEGRAM_ACCESS_TOKEN, this.buildTelegrafOptions());
  }

  onModuleInit() {
    this.telegraf.start(ctx => ctx.reply('Hello'));
    this.telegraf.launch();
  }

  private buildTelegrafOptions() {
    if (!isProd) {
      return {
        telegram: {
          agent: buildProxySocksAgent(),
        },
      };
    }
  }
}
