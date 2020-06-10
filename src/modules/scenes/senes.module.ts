import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from '../tasks/tasks.entity';
import {User} from '../users/users.entity';
import {QueueModule} from '../queue/queue.module';
import {TelegramModule} from '../telegram/telegram.module';
import {MainScene} from './scenes/main/main.scene';
import {StageMiddleware} from './middlewares/stage.middleware';
import {SceneService} from './scene.service';
import {QuotesModule} from '../quotes/quotes.module';
import {TasksModule} from '../tasks/tasks.module';
import {TasksMainMenuScene} from './scenes/tasks/tasks-main-menu/tasks-main-menu.scene';
import {TaskCreateEndScene} from './scenes/tasks/task-create-end/task-create-end.scene';
import {TaskCreateScene} from './scenes/tasks/task-create/task-create.scene';
import {TaskCreateSetDateScene} from './scenes/tasks/task-create-set-date/task-create-set-date.scene';
import {TaskCreateSetTimeScene} from './scenes/tasks/task-create-set-time/task-create-set-time.scene';
import { TasksScene } from './scenes/tasks/tasks.scene';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), QueueModule, TelegramModule, QuotesModule, TasksModule],
  providers: [
    SceneService,
    MainScene,
    StageMiddleware,
    TasksMainMenuScene,
    TaskCreateEndScene,
    TaskCreateScene,
    TaskCreateSetDateScene,
    TaskCreateSetTimeScene,
    TasksScene
  ],
  exports: [
    SceneService,
    MainScene,
    StageMiddleware,
    TasksMainMenuScene,
    TaskCreateEndScene,
    TaskCreateScene,
    TaskCreateSetDateScene,
    TaskCreateSetTimeScene,
    TasksScene
  ],
})
export class ScenesModule {}
