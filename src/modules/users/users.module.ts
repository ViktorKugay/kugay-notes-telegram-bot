import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users.entity';
import {AuthMiddleware} from './middlewares/auth.middleware';
import {TelegramModule} from '../telegram/telegram.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TelegramModule],
  providers: [UsersService, AuthMiddleware],
})
export class UsersModule {}
