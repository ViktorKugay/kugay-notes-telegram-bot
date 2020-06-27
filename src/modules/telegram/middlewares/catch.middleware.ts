import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CatchMiddleware {
  public use = async (_: Error, ctx: ProjectTelegrafContext): Promise<void> => {
    return await ctx.scene.enter(TelegrafScene.error_handling);
  };
}
