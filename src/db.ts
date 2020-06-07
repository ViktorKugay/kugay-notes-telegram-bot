import path from 'path';
import {env} from './config';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const dbConfig = {
  type: 'postgres' as 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  ssl: env.POSTGRES_SSL ? {rejectUnauthorized: false} : undefined,
  entities: [path.resolve(`${__dirname}/modules/**/*.entity.{ts,js}`)],
  logging: true,
};
