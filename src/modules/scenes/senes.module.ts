import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from '../tasks/tasks.entity';
import {User} from '../users/users.entity';
import {QueueModule} from '../queue/queue.module';
import {TelegramModule} from '../telegram/telegram.module';
import {TasksScene} from './tasks/tasks.scene';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), QueueModule, TelegramModule],
  providers: [TasksScene],
  exports: [TasksScene],
})
export class ScenesModule {}
