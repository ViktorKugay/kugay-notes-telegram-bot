import {Module} from '@nestjs/common';
import {TelegramModule} from './modules/telegram/telegram.module';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from './db';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), TelegramModule, UsersModule],
})
export class AppModule {}
