import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getManager} from 'typeorm';
import {Task} from './tasks.entity';
import {User} from '../users/users.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasksRepo: Repository<Task>) {}

  public async createTask(task: Partial<Task>) {
    return await this.tasksRepo.save(task);
  }

  public updateNewTask(user: User, data: Partial<Task>): Promise<Task> {
    return getManager().transaction(async manager => {
      const task = await this.findNewUserTask(user);
      await manager.update(Task, task.id, data);

      return {...task, ...data};
    });
  }

  public async findNewUserTask(user: User): Promise<Task> {
    const [task]: [Task] = await this.tasksRepo
      .createQueryBuilder()
      .select('*')
      .from(Task, 'tasks')
      .where({user})
      .orderBy('tasks.createdAt', 'DESC')
      .limit(1)
      .execute();

    return task;
  }

  public async updateTask(id: string, data: Partial<Task>) {
    return await this.tasksRepo.save({id, ...data});
  }
}
