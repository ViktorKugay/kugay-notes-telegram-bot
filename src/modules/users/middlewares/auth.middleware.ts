import {Repository} from 'typeorm';
import {User} from '../users.entity';
import {ProjectTelegrafContext} from '../../telegram/telegram.types';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {prepareUser} from './helpers/prepareUser';

@Injectable()
export class AuthMiddleware {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    if (ctx.from) {
      if (!ctx.session.user) {
        const {id, first_name, last_name, username} = ctx.from;

        let user = await this.usersRepo.findOne({where: {id}, relations: ['tasks']});
        if (!user) {
          user = await this.usersRepo.save({id, firstName: first_name, lastName: last_name, username});
        }

        ctx.session.user = prepareUser(user);
      }
    }

    next();
  };
}
