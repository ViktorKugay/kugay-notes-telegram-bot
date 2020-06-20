import {Repository} from 'typeorm';
import {User} from '../../users/users.entity';
import {ProjectTelegrafContext} from '../telegram.types';
import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthMiddleware {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    if (ctx.from) {
      if (!ctx.session.user) {
        const {id, first_name, last_name, username} = ctx.from;
        let user = await this.usersRepo.findOne({where: {id}, relations: ['tasks', 'aliases']});
        if (!user) {
          user = await this.usersRepo.save({id, firstName: first_name, lastName: last_name, username});
        }

        ctx.session.user = prepareUser(user);
      }
    }

    next();
  };
}

export function prepareUser(user: User): User {
  user.tasks = user.tasks ? user.tasks : [];
  user.aliases = user.aliases ? user.aliases : [];

  return user;
}
