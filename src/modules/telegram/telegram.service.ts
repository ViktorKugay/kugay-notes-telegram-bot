import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Telegraf} from 'telegraf';
import {TelegrafContext} from 'telegraf/typings/context';

@Injectable()
export class TelegramService {
  private readonly telegraf: Telegraf<TelegrafContext>;
  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get('TELEGRAM_ACCESS_TOKEN');
    this.telegraf = new Telegraf(accessToken);
    this.telegraf.start(ctx => ctx.reply('Welcome'));
    this.telegraf.help(ctx => ctx.reply('Send me a sticker'));
    this.telegraf.on('sticker', ctx => ctx.reply('👍'));
    this.telegraf.hears('hi', ctx => ctx.reply('Hey there'));
    this.telegraf.launch().catch(console.log);
  }
}
