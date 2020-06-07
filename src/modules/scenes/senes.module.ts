import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from '../tasks/tasks.entity';
import {User} from '../users/users.entity';
import {QueueModule} from '../queue/queue.module';
import {TelegramModule} from '../telegram/telegram.module';
import {TasksScene} from './scenes/tasks/tasks.scene';
import {MainScene} from './scenes/main/main.scene';
import {StageMiddleware} from './middlewares/stage.middleware';
import {SceneService} from './scene.service';
import { QuotesModule } from '../quotes/quotes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), QueueModule, TelegramModule, QuotesModule],
  providers: [SceneService, TasksScene, MainScene, StageMiddleware],
  exports: [SceneService, TasksScene, MainScene, StageMiddleware],
})
export class ScenesModule {}
