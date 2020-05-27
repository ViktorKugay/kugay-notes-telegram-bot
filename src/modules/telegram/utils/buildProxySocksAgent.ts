import {SocksProxyAgent} from 'socks-proxy-agent';
import {env} from '../../../config';

const {TELEGRAM_PROXY_AGENT_HOST, TELEGRAM_PROXY_AGENT_PORT} = env;

export const buildProxySocksAgent = () => {
  return new SocksProxyAgent({
    host: TELEGRAM_PROXY_AGENT_HOST,
    port: TELEGRAM_PROXY_AGENT_PORT,
  });
};
