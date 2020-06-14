import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getManager} from 'typeorm';
import {User} from '../users/users.entity';
import {TelegrafScene} from '../telegram/telegram.types';
import {Alias} from './aliases.entity';

@Injectable()
export class AliasesService {
  constructor(@InjectRepository(Alias) private readonly aliasesRepo: Repository<Alias>) {}

  public async createAlias(scene: TelegrafScene, user: User) {
    return await this.aliasesRepo.save({scene, user});
  }

  public updateNewAlias(user: User, data: Partial<Alias>): Promise<Alias> {
    return getManager().transaction(async manager => {
      const task = await this.findNewUserAlias(user);
      await manager.update(Alias, task.id, data);

      return {...task, ...data};
    });
  }

  public async findNewUserAlias(user: User): Promise<Alias> {
    const [alias]: [Alias] = await this.aliasesRepo
      .createQueryBuilder()
      .select('*')
      .from(Alias, 'aliases')
      .where({user})
      .orderBy('aliases.createdAt', 'DESC')
      .limit(1)
      .execute();

    return alias;
  }
}
