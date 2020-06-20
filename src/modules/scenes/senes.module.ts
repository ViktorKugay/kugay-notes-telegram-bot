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
import {TasksMainScene} from './scenes/tasks/tasks-main/tasks-main.scene';
import {TaskCreateSuccessScene} from './scenes/tasks/tasks-create/task-create-success.scene';
import {TaskCreateSetTaskScene} from './scenes/tasks/tasks-create/task-create-set-task.scene';
import {TaskCreateSetDateScene} from './scenes/tasks/tasks-create/task-create-set-date.scene';
import {TaskCreateSetTimeScene} from './scenes/tasks/tasks-create/task-create-set-time.scene';
import {TasksScene} from './scenes/tasks/tasks.scene';
import {TasksGetTasksListScene} from './scenes/tasks/tasks-get/tasks-get-tasks-list.scene';
import {TasksGetMainScene} from './scenes/tasks/tasks-get/tasks-get-main.scene';
import {AliasesModule} from '../aliases/aliases.module';
import {AliasCreateSetAliasScene} from './scenes/aliases/aliases-create/aliases-create-set-alias.scene';
import {AliasCreateSetSceneScene} from './scenes/aliases/aliases-create/aliases-create-set-scene.scene';
import {AliasesMainScene} from './scenes/aliases/aliases-main/aliases-main-menu.scene';
import {AliasesGetAliasesListScene} from './scenes/aliases/aliases-get/aliases-get-aliases-list.scene';
import {SettingsMainScene} from './scenes/settings/settings-main/settings-main.scene';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task]),
    QueueModule,
    TelegramModule,
    QuotesModule,
    TasksModule,
    AliasesModule,
  ],
  providers: [
    SceneService,
    MainScene,
    StageMiddleware,
    TasksMainScene,
    TaskCreateSuccessScene,
    TaskCreateSetTaskScene,
    TaskCreateSetDateScene,
    TaskCreateSetTimeScene,
    TasksScene,
    TasksGetTasksListScene,
    TasksGetMainScene,
    AliasCreateSetAliasScene,
    AliasCreateSetSceneScene,
    AliasesMainScene,
    AliasesGetAliasesListScene,
    SettingsMainScene,
  ],
  exports: [
    SceneService,
    MainScene,
    StageMiddleware,
    TasksMainScene,
    TaskCreateSuccessScene,
    TaskCreateSetTaskScene,
    TaskCreateSetDateScene,
    TaskCreateSetTimeScene,
    TasksScene,
    TasksGetTasksListScene,
    TasksGetMainScene,
    AliasCreateSetAliasScene,
    AliasCreateSetSceneScene,
    AliasesMainScene,
    AliasesGetAliasesListScene,
    SettingsMainScene,
  ],
})
export class ScenesModule {}
