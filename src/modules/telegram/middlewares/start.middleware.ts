import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StartMiddleware {
  public async use(ctx: ProjectTelegrafContext, next: () => Promise<void>): Promise<void> {
    ctx.scene.enter(TelegrafScene.main);
    next();
  }
}
