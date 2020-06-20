import {Task} from '../../../../../tasks/tasks.entity';

export function sortTasksByCreatedAt(tasks: Task[]) {
  return tasks.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
