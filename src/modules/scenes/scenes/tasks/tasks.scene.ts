import {TelegramService} from '../../../telegram/telegram.service';
import {QueueService} from '../../../queue/queue.service';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {QueueJob} from '../../../queue/queue.types';

@Injectable()
export class TasksScene implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService, private readonly queueService: QueueService) {}

  onModuleInit() {
    this.queueService.subscribe(QueueJob.nofifyUserTask, this.telegramService.notifyUserTask);
  }
}
