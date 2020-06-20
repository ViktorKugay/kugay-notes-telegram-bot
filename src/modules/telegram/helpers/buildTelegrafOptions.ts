import {buildProxySocksAgent} from './buildProxySocksAgent';
import {isProd} from '../../../config';

export function buildTelegrafOptions() {
  if (!isProd) {
    return {
      telegram: {
        agent: buildProxySocksAgent(),
      },
    };
  }
}
