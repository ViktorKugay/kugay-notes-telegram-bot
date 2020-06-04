import {Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/users.entity';
import {AuthMiddleware} from './middlewares/auth.middleware';
import {StartMiddleware} from './middlewares/start.middleware';
import {StageMiddleware} from './middlewares/stage.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramService, AuthMiddleware, StartMiddleware, StageMiddleware],
  exports: [TelegramService],
})
export class TelegramModule {}
