import {buildTaskMessageHeader} from './buildTaskMessageHeader';
import {buildTaskContent} from './buildTaskContent';
import {buildTaskDate} from './buildTaskDate';
import {Task} from 'src/modules/tasks/tasks.entity';

export function buildTaskMessage(task: Task) {
  return [
    buildTaskMessageHeader(task.isActiveTask),
    buildTaskContent(task.content),
    buildTaskDate(task.date, task.time),
  ].join('\n\n');
}
