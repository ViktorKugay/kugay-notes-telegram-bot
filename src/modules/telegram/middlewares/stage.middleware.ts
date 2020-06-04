import {TasksScene} from 'src/modules/scenes/tasks/tasks.scene';
import {MainScene} from 'src/modules/scenes/main/main.scene';
import {ProjectTelegrafContext} from '../telegram.types';
import {MiddlewareFn} from 'telegraf/typings/composer';
import {Stage} from 'telegraf/typings/stage';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StageMiddleware {
  public stage: Stage<ProjectTelegrafContext>;
  constructor(private readonly tasksScene: TasksScene, private readonly mainScene: MainScene) {
    this.stage = new Stage([this.tasksScene.scene, this.mainScene.scene]);
  }

  get use(): MiddlewareFn<ProjectTelegrafContext> {
    return this.stage.middleware();
  }
}
