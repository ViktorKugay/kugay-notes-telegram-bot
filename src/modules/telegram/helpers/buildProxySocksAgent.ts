import {SocksProxyAgent} from 'socks-proxy-agent';

// @See https://telegrambots.github.io/book/4/proxy.html
export const buildProxySocksAgent = () => {
  return new SocksProxyAgent('socks5://127.0.0.1:9050');
};
