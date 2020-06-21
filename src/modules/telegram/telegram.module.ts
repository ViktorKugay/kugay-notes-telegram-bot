import {Module} from '@nestjs/common';
import {TelegramService} from './telegram.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/users.entity';
import {StartMiddleware} from './middlewares/start.middleware';
import {AliasesMiddleware} from './middlewares/aliases.middleware';
import {AuthMiddleware} from './middlewares/auth.middleware';
import { TasksMiddleware } from './middlewares/tasks.middleware';
import { Task } from '../tasks/tasks.entity';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), QueueModule],
  providers: [TelegramService, StartMiddleware, AliasesMiddleware, AuthMiddleware, TasksMiddleware],
  exports: [TelegramService, StartMiddleware, AliasesMiddleware, AuthMiddleware, TasksMiddleware],
})
export class TelegramModule {}
