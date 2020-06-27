import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

interface ActionButtonData {
  taskId: string;
  act: 'r' | 'u';
}

@Injectable()
export class TasksMiddleware {
  constructor() {}

  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    if (ctx.update && ctx.chat && ctx.update.callback_query && ctx.update.callback_query.data) {
      const data = jsonParse(ctx.update.callback_query.data);
      if (data) {  
        const action = data.act === 'r' ? 'resolve_task' : 'delay_task';

        await ctx.scene.enter(TelegrafScene.tasks_status_delay_set_status, {taskId: data.taskId, action});
      } 
    }

    next();
  };
}

function jsonParse(string: string): ActionButtonData | null {
  try {
    return JSON.parse(string);
  } catch {
    return null;
  }
}
