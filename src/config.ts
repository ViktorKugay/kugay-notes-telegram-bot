import * as envs from 'env-var';
import {config} from 'dotenv';

config();

export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

export const env = {
  TELEGRAM_ACCESS_TOKEN: envs.get('TELEGRAM_ACCESS_TOKEN').asString(),
  TELEGRAM_BOT_NAME: envs.get('TELEGRAM_BOT_NAME').asString(),
  TELEGRAM_PROXY_AGENT_HOST: envs.get('TELEGRAM_PROXY_AGENT_HOST').asString(),
  TELEGRAM_PROXY_AGENT_PORT: envs.get('TELEGRAM_PROXY_AGENT_PORT').asString(),
};
