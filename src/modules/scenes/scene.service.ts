import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegramService} from '../telegram/telegram.service';
import {StageMiddleware} from './middlewares/stage.middleware';

@Injectable()
export class SceneService implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService, private readonly stageMuddleware: StageMiddleware) {}

  onModuleInit() {
    this.telegramService.applyMiddleware(this.stageMuddleware.use());
  }
}
