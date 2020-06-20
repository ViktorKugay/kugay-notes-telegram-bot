import {TelegrafScene} from '../telegram/telegram.types';
import errorNames from '../common/error-names';
import {InjectRepository} from '@nestjs/typeorm';
import { CustomError } from '../../utils/error';
import {Repository, getManager} from 'typeorm';
import {User} from '../users/users.entity';
import {Injectable} from '@nestjs/common';
import {Alias} from './aliases.entity';

@Injectable()
export class AliasesService {
  constructor(@InjectRepository(Alias) private readonly aliasesRepo: Repository<Alias>) {}

  public async createAlias(scene: TelegrafScene, user: User) {
    return await this.aliasesRepo.save({scene, user});
  }

  public async removeLatestUserAlias(user: User) {
    return await getManager().transaction(async manager => {
      const alias = await manager.findOne(Alias, {where: {user}, order: {createdAt: 'DESC'}});
      if (!alias) {
        throw new CustomError(errorNames.ALIAS_DOESNT_EXIST);
      }

      await manager.delete(Alias, alias);
    });
  }

  public async updateLatestAliasByUser(user: User, data: Partial<Alias>): Promise<Alias> {
    return await getManager().transaction(async manager => {
      const alias = await manager.findOne(Alias, {where: {user}, order: {createdAt: 'DESC'}});
      if (!alias) {
        throw new CustomError(errorNames.ALIAS_DOESNT_EXIST);
      }

      return await manager.save(Alias, {...alias, ...data});
    });
  }
}
