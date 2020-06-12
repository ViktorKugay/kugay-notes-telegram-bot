import {SceneBase} from 'src/modules/scenes/scene.base';
import {Injectable, OnModuleInit} from '@nestjs/common';
import {TelegrafScene, ProjectTelegrafContext, ShowTaskType} from 'src/modules/telegram/telegram.types';
import locales from '../../../locales/ru.json';
import keyboards from '../../tasks/tasks.keyboard';

@Injectable()
export class TasksShowMainMenuScene extends SceneBase implements OnModuleInit {
  constructor() {
    super(TelegrafScene.tasks_show_main_menu);
  }

  onModuleInit() {
    this.scene.enter(this.enter);
    this.scene.hears(locales.keyboards.tasks_type.resolved, this.toShowResolvedTasks);
    this.scene.hears(locales.keyboards.tasks_type.unresolved, this.toShowUnresolvedTasks);
  }

  public enter = (ctx: ProjectTelegrafContext) => {
    ctx.reply(locales.scenes.tasks.task_type, keyboards.showResolvedOrUnresolved);
  };

  public toShowResolvedTasks = async (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.tasks_show, {showTaskType: ShowTaskType.resolved});
  };

  public toShowUnresolvedTasks = async (ctx: ProjectTelegrafContext) => {
    ctx.scene.enter(TelegrafScene.tasks_show, {showTaskType: ShowTaskType.unresolved});
  };
}
