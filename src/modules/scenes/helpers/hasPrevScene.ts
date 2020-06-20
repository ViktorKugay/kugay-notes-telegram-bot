import {ProjectTelegrafContext, TelegrafScene, SceneWithState} from '../../telegram/telegram.types';

interface ContextWithPrevScene extends SceneWithState {
  scene: {
    state: {
      prevScene: TelegrafScene;
    };
  };
}

export function hasPrevScene(ctx: ProjectTelegrafContext | ContextWithPrevScene): ctx is ContextWithPrevScene {
  return Boolean(ctx.scene.state && ctx.scene.state.prevScene);
}
