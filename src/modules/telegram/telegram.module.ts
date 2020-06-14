import {Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/users.entity';
import {StartMiddleware} from './middlewares/start.middleware';
import {RouterMiddleware} from './middlewares/router.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramService, StartMiddleware, RouterMiddleware],
  exports: [TelegramService, StartMiddleware, RouterMiddleware],
})
export class TelegramModule {}
