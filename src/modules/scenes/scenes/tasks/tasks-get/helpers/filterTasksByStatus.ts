import {TaskStatus} from '../../../../../telegram/telegram.types';
import {Task} from '../../../../../tasks/tasks.entity';

export function filterTasksByStatus(tasks: Task[], taskStatus: TaskStatus) {
  return tasks.filter(task => (taskStatus === TaskStatus.resolved ? task.isActiveTask : !task.isActiveTask));
}
