import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getManager} from 'typeorm';
import {Task} from './tasks.entity';
import {User} from '../users/users.entity';
import { CustomError } from 'src/utils/error';
import errorNames from '../common/error-names';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasksRepo: Repository<Task>) {}

  public async createTask(task: Partial<Task>) {
    return await this.tasksRepo.save(task);
  }

  public async updateTaskById(id: string, data: Partial<Task>) {
    return await this.tasksRepo.save({id, ...data});
  }

  public async removeLatestUserTask(user: User) {
    return await getManager().transaction(async manager => {
      const task = await manager.findOne(Task, {where: {user}, order: {createdAt: 'DESC'}});
      if (!task) {
        throw new CustomError(errorNames.TASK_DOESNT_EXIST);
      }

      await manager.delete(Task, task);
    });
  }

  public async updateLatestTaskByUser(user: User, data: Partial<Task>): Promise<Task> {
    return await getManager().transaction(async manager => {
      const task = await manager.findOne(Task, {where: {user}, order: {createdAt: 'DESC'}});
      if (!task) {
        throw new CustomError(errorNames.TASK_DOESNT_EXIST);
      }

      return await manager.save(Task, {...task, ...data});
    });
  }
}
