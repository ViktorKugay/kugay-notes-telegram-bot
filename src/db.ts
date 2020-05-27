import * as env from 'env-var';
import path from 'path';
import {config} from 'dotenv';

config();

export const dbConfig = {
  type: 'postgres' as 'postgres',
  host: env.get('POSTGRES_HOST').asString(),
  port: env.get('POSTGRES_PORT').asPortNumber(),
  username: env.get('POSTGRES_USER').asString(),
  password: env.get('POSTGRES_PASSWORD').asString(),
  database: env.get('POSTGRES_DB').asString(),
  entities: [path.resolve(`${__dirname}/modules/**/*.entity.{ts,js}`)],
  logging: true,
};
