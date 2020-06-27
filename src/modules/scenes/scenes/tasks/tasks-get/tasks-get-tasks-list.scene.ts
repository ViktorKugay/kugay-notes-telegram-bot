import {TelegrafScene, ProjectTelegrafContext, TaskStatus} from '../../../../telegram/telegram.types';
import {hasTaskStatus} from '../../../../scenes/helpers/hasTaskStatus';
import {sortTasksByCreatedAt} from './helpers/sortTasksByCreatedAt';
import {filterTasksByStatus} from './helpers/filterTasksByStatus';
import {buildTaskMessage} from './helpers/buildTaskMessage';
import {SceneBase} from '../../../../scenes/scene.base';
import {CustomError} from '../../../../../utils/error';
import errorNames from '../../../../common/error-names';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {Task} from '../../../../tasks/tasks.entity';
import locales from '../../../locales/ru.json';
import { buildSetTaskTypeKeyboard } from '../tasks.scene';

@Injectable()
export class TasksGetTasksListScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_get_tasks_list);
  }

  onModuleInit() {
    this.scene.enter(this.onEnter);
  }

  public onEnter = async (ctx: ProjectTelegrafContext) => {
    if (hasTaskStatus(ctx)) {
      const userTasks = this.prepareUserTasks(ctx.session.user.tasks, ctx.scene.state.taskStatus);

      const hasUserTasks = userTasks.length > 0;
      if (!hasUserTasks) {
        return await ctx.reply(locales.scenes.tasks.tasks_has_no_tasks);
      }

      return await this.showUserTasksList(ctx, userTasks);
    } else {
      throw new CustomError(errorNames.MISSING_TASK_STATUS_SCENE_PROP);
    }
  };

  private showUserTasksList = async (ctx: ProjectTelegrafContext, userTasks: Task[]) => {
    for (const task of userTasks) {
      await ctx.replyWithHTML(buildTaskMessage(task), buildSetTaskTypeKeyboard(task.id));
    }
  };

  private prepareUserTasks = (tasks: Task[], taskStatus: TaskStatus) => {
    const filtredTasksByStatus = filterTasksByStatus(tasks, taskStatus);
    const sortedTasksByCreatedAt = sortTasksByCreatedAt(filtredTasksByStatus);

    return sortedTasksByCreatedAt.slice(0, 3).reverse();
  };
}
