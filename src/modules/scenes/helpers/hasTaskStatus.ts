import {ProjectTelegrafContext, SceneWithState} from '../../telegram/telegram.types';

interface ContextWithTaskStatus extends SceneWithState {
  scene: {
    state: {
      taskStatus: string;
    };
  };
}

export function hasTaskStatus(ctx: ProjectTelegrafContext | ContextWithTaskStatus): ctx is ContextWithTaskStatus {
  return Boolean(ctx.scene.state && ctx.scene.state.taskStatus);
}
