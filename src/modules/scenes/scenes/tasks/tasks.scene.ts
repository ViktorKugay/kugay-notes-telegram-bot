import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegramService} from '../../../telegram/telegram.service';
import {SceneBase} from '../../scene.base';
import {TelegrafScene, ProjectTelegrafContext} from 'src/modules/telegram/telegram.types';
import {QueueService} from 'src/modules/queue/queue.service';
import locales from '../../locales/ru.json';
import keyboards from './tasks.keyboard';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../../../users/users.entity';
import {Task} from 'src/modules/tasks/tasks.entity';
import {QueueJob} from 'src/modules/queue/queue.types';

@Injectable()
export class TasksScene extends SceneBase implements OnModuleInit {
  constructor(
    // @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
    private readonly telegramService: TelegramService,
    private readonly queueService: QueueService,
  ) {
    super(TelegrafScene.main);
  }

  async onModuleInit() {
    this.scene.enter(this.onEnter);
    this.scene.hears(locales.keyboards.tasks.create, this.onHearCreate);
    this.scene.on('message', this.onMessage);

    await this.queueService.subscribe(QueueJob.nofifyUserTask, this.notifyUserTask);
  }

  private notifyUserTask = async ({chatId, content}: {chatId: string; content: string}) => {
    this.telegramService.getTelegram().sendMessage(chatId, content);
  };

  private onEnter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.info, keyboards.showOrCreate);
  };

  private onHearCreate = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.start);
    ctx.session.isCrateTaskMode = true;
  };

  private onMessage = async (ctx: ProjectTelegrafContext) => {
    const {isCrateTaskMode} = ctx.session;
    if (isCrateTaskMode && ctx.message) {
      await this.tasksRepo.insert({content: ctx.message.text, user: ctx.session.user});
      await this.queueService.publish(QueueJob.nofifyUserTask, {
        content: ctx.message.text,
        chatId: ctx.message.chat.id,
      });
      ctx.session.isCrateTaskMode = false;
    }
  };
}
