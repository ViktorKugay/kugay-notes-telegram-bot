import {Repository} from 'typeorm';
import {User} from '../users.entity';
import {ProjectTelegrafContext} from '../../telegram/telegram.types';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class AuthMiddleware {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  public async use(ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> {
    if (ctx.from) {
      if (!ctx.session.user) {
        const {id, first_name, last_name, username} = ctx.from;
        const user = await this.usersRepo.findOne({where: {id}, relations: ['tasks']});
        if (!user) {
          ctx.session.user = await this.usersRepo.save({id, firstName: first_name, lastName: last_name, username});
        } else {
          ctx.session.user = user;
        }
      }
    }

    next();
  }
}
