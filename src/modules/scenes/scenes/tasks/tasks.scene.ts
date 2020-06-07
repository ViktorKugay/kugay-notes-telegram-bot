import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegramService} from '../../../telegram/telegram.service';
import {SceneBase} from '../../scene.base';
import {TelegrafScene, ProjectTelegrafContext} from 'src/modules/telegram/telegram.types';
import {QueueService} from 'src/modules/queue/queue.service';
import locales from '../../locales/ru.json';
import keyboards from './tasks.keyboard';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
// import {User} from '../../../users/users.entity';
import {Task} from 'src/modules/tasks/tasks.entity';
import {QueueJob} from 'src/modules/queue/queue.types';
import {TaskAction} from './tasks.types';
import { QuotesService } from 'src/modules/quotes/quotes.service';
import catStickers from '../../../common/cat-stickers.json'

@Injectable()
export class TasksScene extends SceneBase implements OnModuleInit {
  constructor(
    // @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
    private readonly quoteService: QuotesService,
    private readonly telegramService: TelegramService,
    private readonly queueService: QueueService,
  ) {
    super(TelegrafScene.tasks);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.tasks.create, this.onCreateTaskAction);
    this.scene.hears(locales.keyboards.date.never, this.onEndWithoutNotification);
    this.scene.hears(locales.keyboards.date.today, this.onSetDate);
    this.scene.hears(locales.keyboards.date.tomorrow, this.onSetDate);
    this.scene.hears(locales.keyboards.date.after_tomorrow, this.onSetDate);

    this.scene.on('message', this.onMessage);

    this.queueService.subscribe(QueueJob.nofifyUserTask, this.notifyUserTask);
  }

  private onSetDate = (ctx: ProjectTelegrafContext) => {  
    console.log(ctx);
  }

  private onEndWithoutNotification = async (ctx: ProjectTelegrafContext) => {
    await ctx.reply(locales.scenes.tasks.end_without_notification);
    await ctx.reply(locales.scenes.tasks.to_quote);
    const quote = await this.quoteService.getQuote();
    await ctx.replyWithSticker('CAACAgIAAxkBAAIDtl7crqrGbEwd5HahhSPi4fjQe_YZAAL4AQACNJsOEMrlsJmZlGYkGgQ');
    await ctx.reply(`${quote.text}${quote.author ? '\n' : ''}${quote.author}`);
  }

  private onEnter = (ctx: ProjectTelegrafContext) => {
    const sticker = catStickers.stickers.find(sticker => sticker.emoji === '🤓');
    if (sticker) {
      ctx.replyWithSticker(sticker.file_id);
    }
    ctx.reply(locales.scenes.tasks.info, keyboards.showOrCreate);
  };

  private onCreateTaskAction = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.start);
    const sticker = catStickers.stickers.find(sticker => sticker.emoji === '🤔');
    if (sticker) {
      ctx.replyWithSticker(sticker.file_id);
    }
    this.enableCreateTaskMode(ctx);
  }

  private async createTask(ctx: ProjectTelegrafContext) {
    if (ctx.message) {
      this.disableCreateTaskMode(ctx);
      await this.tasksRepo.insert({content: ctx.message.text, user: ctx.session.user});
      ctx.reply(locales.scenes.tasks.date, keyboards.setNotificationDate);
    }
  }

  private disableCreateTaskMode = (ctx: ProjectTelegrafContext) => {
    ctx.session.isCrateTaskMode = false;
  } 

  private enableCreateTaskMode = (ctx: ProjectTelegrafContext) => {
    ctx.session.isCrateTaskMode = true;
  };

  private onMessage = async (ctx: ProjectTelegrafContext) => {
    const {isCrateTaskMode} = ctx.session;
    if (isCrateTaskMode) {
      return await this.messagesRouter(TaskAction.createNewTask, ctx);
    }
  };

  private messagesRouter = async (action: TaskAction, ctx: ProjectTelegrafContext) => {
    switch (action) {
      case TaskAction.createNewTask: {
        return await this.createTask(ctx);
      }
    }
  }

  private notifyUserTask = async ({chatId, content}: {chatId: string; content: string}) => {
    console.log("TasksScene -> privatenotifyUserTask -> chatId", chatId)
    this.telegramService.getTelegram().sendMessage(chatId, content);
  };
}
