import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CatchMiddleware {
  public use = async (error: Error, ctx: ProjectTelegrafContext): Promise<void> => {
    console.log(error);
    return await ctx.scene.enter(TelegrafScene.error_handling);
  };
}
