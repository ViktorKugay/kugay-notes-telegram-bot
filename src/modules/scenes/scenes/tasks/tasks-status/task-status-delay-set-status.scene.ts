import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {Task} from 'src/modules/tasks/tasks.entity';
import {Injectable, OnModuleInit} from '@nestjs/common';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';
import {getManager} from 'typeorm';

interface ActionButtonData {
  taskId: string;
  act: 'r' | 'u';
}

@Injectable()
export class TaskStatusSetStatusScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_status_delay_set_status);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  private onEnter = async (ctx: ProjectTelegrafContext) => {
    const taskId = ctx.scene.state.taskId;
    const action = ctx.scene.state.action;
    await getManager().transaction(async manager => {
      const task = await manager.findOne(Task, taskId);
      if (task) {
        switch (action) {
          case 'delay_task': {
            await ctx.reply(locales.scenes.tasks.tasks_delay_task);
            await ctx.scene.enter(TelegrafScene.tasks_status_delay_set_date, {taskId});

            break;
          }

          case 'resolve_task': {
            await manager.update(Task, task.id, {isResolved: true});
            await ctx.reply(locales.scenes.tasks.tasks_success_resolve);
            await ctx.scene.enter(TelegrafScene.main, {
              prevScene: TelegrafScene.tasks_status_delay_set_status
            });

            break;
          }
        }
      }
    });
  };

  jsonParse(string: string): ActionButtonData | null {
    try {
      return JSON.parse(string);
    } catch {
      return null;
    }
  }
}
