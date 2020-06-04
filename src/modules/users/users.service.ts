import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegramService} from '../telegram/telegram.service';
import {AuthMiddleware} from './middlewares/auth.middleware';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService, private readonly authMiddleware: AuthMiddleware) {}

  onModuleInit() {
    this.telegramService.applyMiddleware(this.authMiddleware.use);
  }
}
