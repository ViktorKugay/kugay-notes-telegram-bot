import {Module} from '@nestjs/common';
import {TelegramModule} from './modules/telegram/telegram.module';
import {UsersModule} from './modules/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from './db';
import {QueueModule} from './modules/queue/queue.module';
import {ScenesModule} from './modules/scenes/senes.module';
import {QuotesModule} from './modules/quotes/quotes.module';
import {AliasesModule} from './modules/aliases/aliases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TelegramModule,
    UsersModule,
    QueueModule,
    ScenesModule,
    QuotesModule,
    AliasesModule,
  ],
})
export class AppModule {}
