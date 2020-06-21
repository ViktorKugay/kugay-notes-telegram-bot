import {ProjectTelegrafContext} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AliasesMiddleware {
  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
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
