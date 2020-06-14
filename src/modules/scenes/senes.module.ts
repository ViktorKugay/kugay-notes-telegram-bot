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
import {TasksScene} from './scenes/tasks/tasks.scene';
import {TasksShowScene} from './scenes/tasks/tasks-show/tasks-show.scene';
import {TasksShowMainMenuScene} from './scenes/tasks/tasks-show-resolved/tasks-show-main-menu';
import {AliasesModule} from '../aliases/aliases.module';
import {AliasCreateSetAliasScene} from './scenes/aliases/aliases-create-set-alias/aliases-create-set-alias';
import {AliasCreateSetSceneScene} from './scenes/aliases/aliases-create-set-scene/aliases-create-set-scene.scene';
import {AliasesMainMenuScene} from './scenes/aliases/aliases-main-menu/aliases-main-menu.scene';
import {AliasesShowScene} from './scenes/aliases/aliases-show/aliases-show.scene';
import { SettingsMainMenuScene } from './scenes/settings/settings-main-menu/settings-main-menu.scene';

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
    TasksMainMenuScene,
    TaskCreateEndScene,
    TaskCreateScene,
    TaskCreateSetDateScene,
    TaskCreateSetTimeScene,
    TasksScene,
    TasksShowScene,
    TasksShowMainMenuScene,
    AliasCreateSetAliasScene,
    AliasCreateSetSceneScene,
    AliasesMainMenuScene,
    AliasesShowScene,
    SettingsMainMenuScene
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
    TasksScene,
    TasksShowScene,
    TasksShowMainMenuScene,
    AliasCreateSetAliasScene,
    AliasCreateSetSceneScene,
    AliasesMainMenuScene,
    AliasesShowScene,
    SettingsMainMenuScene
  ],
})
export class ScenesModule {}
