import {TelegramService} from '../../../telegram/telegram.service';
import {QueueService} from '../../../queue/queue.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {QueueJob} from '../../../queue/queue.types';
import { Markup } from 'telegraf';
import locales from '../../locales/ru.json';

// r - resolve
// u - unrseolve
// d - delete
// act - action

export const buildSetTaskTypeKeyboard = (taskId: string) => {
  return Markup.inlineKeyboard([
    Markup.callbackButton(locales.keyboards.actions.resolve, JSON.stringify({taskId, act: 'r'})),
    Markup.callbackButton(locales.keyboards.actions.unresolve, JSON.stringify({taskId, act: 'u'})),
    Markup.callbackButton(locales.keyboards.actions.delete, JSON.stringify({taskId, act: 'd'})),
  ]).extra();
}

@Injectable()
export class TasksScene implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService, private readonly queueService: QueueService) {}

  onModuleInit() {
    this.queueService.subscribe(QueueJob.nofifyUserTask, this.notifyUserWithKeyboard);
  }

  private notifyUserWithKeyboard = async ({chatId, content, taskId}: {chatId: string; content: string; taskId: string}) => {
    this.telegramService.getTelegram().sendMessage(chatId, content, {
      ...buildSetTaskTypeKeyboard(taskId), 
      parse_mode: 'HTML'
    });
  }
}
