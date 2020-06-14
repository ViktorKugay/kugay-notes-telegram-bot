import {TelegrafScene, ProjectTelegrafContext, ShowTaskType} from 'src/modules/telegram/telegram.types';
import {sortTasksByCreatedAt} from './helpers/sortTasksByCreatedAt';
import {filterTasksByStatus} from './helpers/filterTasksByStatus';
import {buildTaskMessage} from './helpers/buildTaskMessage';
import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {Task} from '../../../../tasks/tasks.entity';
import locales from '../../../locales/ru.json';

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
        await ctx.reply(buildTaskMessage(task));
      }
    } else {
      ctx.reply(locales.scenes.tasks.tasks_has_no_tasks);
    }
  };

  private prepareUserTasks = (tasks: Task[], showTaskType: ShowTaskType) => {
    const filtredTasksByStatus = filterTasksByStatus(tasks, showTaskType);
    const sortedTasksByCreatedAt = sortTasksByCreatedAt(filtredTasksByStatus);

    return sortedTasksByCreatedAt.slice(0, 3).reverse();
  };
}
