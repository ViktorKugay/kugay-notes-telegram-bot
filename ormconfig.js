'use strict';

const path = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ssl: {rejectUnauthorized: false},
  entities: [path.resolve(`${__dirname}/src/modules/**/*.entity.ts`)],
  migrations: [path.join(__dirname, './src/migrations/*.ts')],
  cli: {migrationsDir: 'src/migrations'}
};