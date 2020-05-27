import {Module} from '@nestjs/common';
import {TelegramModule} from './modules/telegram/telegram.module';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from './db';
import {QueueModule} from './modules/queue/queue.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), TelegramModule, UsersModule, QueueModule],
})
export class AppModule {}
