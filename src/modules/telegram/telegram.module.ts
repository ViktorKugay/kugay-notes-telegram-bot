import {Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/users.entity';
import {StartMiddleware} from './middlewares/start.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramService, StartMiddleware],
  exports: [TelegramService, StartMiddleware],
})
export class TelegramModule {}
