import * as envs from 'env-var';
import {config} from 'dotenv';

config();

export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

interface Envs {
  TELEGRAM_ACCESS_TOKEN: string;
  TELEGRAM_BOT_NAME: string;
  TELEGRAM_PROXY_AGENT_HOST: string;
  TELEGRAM_PROXY_AGENT_PORT: string;

  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: number;
  POSTGRES_SSL: boolean;
}

export const env = {
  TELEGRAM_ACCESS_TOKEN: envs.get('TELEGRAM_ACCESS_TOKEN').asString(),
  TELEGRAM_BOT_NAME: envs.get('TELEGRAM_BOT_NAME').asString(),
  TELEGRAM_PROXY_AGENT_HOST: envs.get('TELEGRAM_PROXY_AGENT_HOST').asString(),
  TELEGRAM_PROXY_AGENT_PORT: envs.get('TELEGRAM_PROXY_AGENT_PORT').asString(),

  POSTGRES_HOST: envs.get('POSTGRES_HOST').asString(),
  POSTGRES_USER: envs.get('POSTGRES_USER').asString(),
  POSTGRES_PASSWORD: envs.get('POSTGRES_PASSWORD').asString(),
  POSTGRES_DB: envs.get('POSTGRES_DB').asString(),
  POSTGRES_PORT: envs.get('POSTGRES_PORT').asPortNumber(),
  POSTGRES_SSL: envs.get('POSTGRES_SSL').asBool(),
} as Envs;
