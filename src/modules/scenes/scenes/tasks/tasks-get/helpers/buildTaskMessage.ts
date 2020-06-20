import {buildTaskMessageHeader} from './buildTaskMessageHeader';
import {buildTaskContent} from './buildTaskContent';
import {buildTaskDate} from './buildTaskDate';
import {Task} from 'src/modules/tasks/tasks.entity';

export function buildTaskMessage(task: Task) {
  return [
    '<b>',
    buildTaskMessageHeader(task.isActiveTask),
    '</b>',
    buildTaskContent(task.content),
    '<b>',
    buildTaskDate(task.date, task.time),
    '</b>',
  ].join('\n');
}
