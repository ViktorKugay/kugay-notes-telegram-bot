import {ProjectTelegrafContext, TelegrafScene} from '../telegram.types';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StartMiddleware {
  public use = (ctx: ProjectTelegrafContext, next: () => Promise<void>): void => {
    ctx.scene.enter(TelegrafScene.main);
    next();
  }
}
