import {TelegrafScene, ProjectTelegrafContext} from '../../../../telegram/telegram.types';
import {buildTaskMessage} from '../tasks-get/helpers/buildTaskMessage';
import {hasTextMessage} from '../../../helpers/hasMessage';
import {QueueService} from '../../../../queue/queue.service';
import {TasksService} from '../../../../tasks/tasks.service';
import {hasChat} from '../../../helpers/hasChat';
import {Injectable, OnModuleInit} from '@nestjs/common';
import errorNames from '../../../../common/error-names';
import {CustomError} from '../../../../../utils/error';
import locales from '../../../locales/ru.json';
import {SceneBase} from '../../../scene.base';
import keyboards from '../tasks.keyboard';
import {buildNiticationDate} from '../tasks-create/helpers/buildNotificationDate';
import {getManager} from 'typeorm';
import {Task} from 'src/modules/tasks/tasks.entity';

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
