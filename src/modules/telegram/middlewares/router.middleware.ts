import {ProjectTelegrafContext} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class RouterMiddleware {
  public use = (ctx: ProjectTelegrafContext, next: () => Promise<void>): void => {
    const {aliases} = ctx.session.user;
    if (ctx.message && ctx.message.text) {
      const message = ctx.message.text;
      const alias = aliases.find(({alias}) => alias === message);
      if (alias) {
        ctx.scene.enter(alias.scene);
      }
    }

    next();
  };
}
