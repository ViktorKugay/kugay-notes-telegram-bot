import {Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/users.entity';
import {StartMiddleware} from './middlewares/start.middleware';
import {AliasesMiddleware} from './middlewares/aliases.middleware';
import {AuthMiddleware} from './middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [TelegramService, StartMiddleware, AliasesMiddleware, AuthMiddleware],
  exports: [TelegramService, StartMiddleware, AliasesMiddleware, AuthMiddleware],
})
export class TelegramModule {}
