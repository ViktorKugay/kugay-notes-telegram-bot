import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StartMiddleware {
  public use = async (ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> => {
    await ctx.scene.enter(TelegrafScene.main);
    
    next();
  };
}
