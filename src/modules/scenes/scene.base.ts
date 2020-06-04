import Scene from 'telegraf/scenes/base';
import {TelegrafScene, ProjectTelegrafContext} from '../telegram/telegram.types';
import {Scene as SceneType} from 'telegraf/typings/stage';

export class SceneBase {
  public scene: SceneType<ProjectTelegrafContext>;
  constructor(sceneId: TelegrafScene) {
    this.scene = new Scene(sceneId);
  }
}
