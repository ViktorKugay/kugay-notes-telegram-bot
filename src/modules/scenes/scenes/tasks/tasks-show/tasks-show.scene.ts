import {TelegrafScene, ProjectTelegrafContext, ShowTaskType} from 'src/modules/telegram/telegram.types';
import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {Task} from 'src/modules/tasks/tasks.entity';
import keyboards from '../tasks.keyboard';
import locales from '../../../locales/ru.json';
import {parseDate} from 'src/utils/parseDate';
import {buildTaskDate} from './helpers/buildTaskDate';
import {buildTaskEmoji} from './helpers/buildTaskEmoji';
import {buildTaskContent} from './helpers/buildTaskContent';
import {buildTaskMessageHeader} from './helpers/buildTaskMessageHeader';
import {sortTasksByCreatedAt} from './helpers/sortTasksByCreatedAt';
import {filterTasksByStatus} from './helpers/filterTasksByStatus';

@Injectable()
export class TasksShowScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_show);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
  }

  public enter = async (ctx: ProjectTelegrafContext) => {
    const showTaskType = ctx.scene.state.showTaskType;
    const preparedUserTasks = this.prepareUserTasks(ctx.session.user.tasks, showTaskType);
    if (preparedUserTasks.length) {
      for (const task of preparedUserTasks) {
        await ctx.reply(this.buildTaskMessage(task));
      }
    } else {
      ctx.reply(locales.scenes.tasks.task_empty);
    }
  };

  private prepareUserTasks = (tasks: Task[], showTaskType: ShowTaskType) => {
    const filtredTasksByStatus = filterTasksByStatus(tasks, showTaskType);
    const sortedTasksByCreatedAt = sortTasksByCreatedAt(filtredTasksByStatus);

    return sortedTasksByCreatedAt.slice(0, 3).reverse();
  };

  private buildTaskMessage = (task: Task) => {
    return [
      buildTaskMessageHeader(task.isActiveTask),
      buildTaskContent(task.content),
      buildTaskDate(task.date, task.time),
    ].join('\n\n');
  };
}
