import * as env from 'env-var';
import {config} from 'dotenv';
import path from 'path';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

config();
export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres' as 'postgres',
  host: env.get('POSTGRES_HOST').asString(),
  port: env.get('POSTGRES_PORT').asPortNumber(),
  username: env.get('POSTGRES_USER').asString(),
  password: env.get('POSTGRES_PASSWORD').asString(),
  database: env.get('POSTGRES_DB').asString(),
  ssl: {rejectUnauthorized: false},
  entities: [path.resolve(`${__dirname}/modules/**/*.entity.{ts,js}`)],
  logging: true,
};
