import {TasksScene} from 'src/modules/scenes/scenes/tasks/tasks.scene';
import {MainScene} from 'src/modules/scenes/scenes/main/main.scene';
import {ProjectTelegrafContext} from '../../telegram/telegram.types';
import {MiddlewareFn} from 'telegraf/typings/composer';
import Stage from 'telegraf/stage';
import {Stage as StageType} from 'telegraf/typings/stage';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StageMiddleware {
  public stage: StageType<ProjectTelegrafContext>;
  constructor(private readonly tasksScene: TasksScene, private readonly mainScene: MainScene) {
    this.stage = new Stage([this.tasksScene.scene, this.mainScene.scene]);
  }

  get use(): MiddlewareFn<ProjectTelegrafContext> {
    return this.stage.middleware();
  }
}
