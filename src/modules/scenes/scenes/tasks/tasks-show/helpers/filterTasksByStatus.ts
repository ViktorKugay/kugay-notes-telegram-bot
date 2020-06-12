import {ShowTaskType} from '../../../../../../modules/telegram/telegram.types';
import {Task} from '../../../../../../modules/tasks/tasks.entity';

export function filterTasksByStatus(tasks: Task[], showTaskType: ShowTaskType) {
  return tasks.filter(task => (showTaskType === ShowTaskType.resolved ? task.isActiveTask : !task.isActiveTask));
}
