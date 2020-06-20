import {AliasesMiddleware} from './middlewares/aliases.middleware';
import {StartMiddleware} from './middlewares/start.middleware';
import {AuthMiddleware} from './middlewares/auth.middleware';
import {ProjectTelegrafContext} from './telegram.types';
import {Telegraf, Middleware} from 'telegraf';
import {Injectable} from '@nestjs/common';
import session from 'telegraf/session';
import {env} from '../../config';

const {TELEGRAM_ACCESS_TOKEN} = env;

@Injectable()
export class TelegramService {
  private telegraf: Telegraf<ProjectTelegrafContext>;

  constructor(
    private readonly startMiddleware: StartMiddleware,
    private readonly aliasesMiddleware: AliasesMiddleware,
    private readonly authMiddleware: AuthMiddleware,
  ) {
    this.telegraf = new Telegraf(TELEGRAM_ACCESS_TOKEN);
    // сессия должна инициализировать перед всеми остальными middlewares,
    // иначе сцены не успевают заинжектить свои состояния
    this.telegraf.use(session());
  }

  onModuleInit() {
    // === middlewares ===
    this.telegraf.use(this.authMiddleware.use);
    this.telegraf.use(this.aliasesMiddleware.use);
    // === start ===
    this.telegraf.start(this.startMiddleware.use);
    // === init ===
    this.telegraf.launch();
  }

  public notifyUserTask = async ({chatId, content}: {chatId: string; content: string}) => {
    this.getTelegram().sendMessage(chatId, content, {parse_mode: 'HTML'});
  };

  public getTelegram() {
    return this.telegraf.telegram;
  }

  public applyMiddleware(middleware: Middleware<ProjectTelegrafContext>) {
    this.telegraf.use(middleware);
  }
}
