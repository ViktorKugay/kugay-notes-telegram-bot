import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

export type Actions = 'r' | 'u' | 'd';

export interface ActionButtonData {
  taskId: string;
  act: Actions;
}

@Injectable()
export class TasksMiddleware {
  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    if (ctx.update && ctx.chat && ctx.update.callback_query && ctx.update.callback_query.data) {
      const data = jsonParse(ctx.update.callback_query.data);
      if (data) {  
        await ctx.scene.enter(TelegrafScene.tasks_status_delay_set_status, {taskId: data.taskId, action: getTaskAction(data.act)});
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

function getTaskAction(action: Actions) {
  switch(action) {
    case 'r': {
      return 'resolve_task';
    }

    case 'u': {
      return 'delay_task';
    }

    case 'd': {
      return 'delete_task';
    }
  }
}