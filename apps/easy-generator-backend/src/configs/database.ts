import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LogLevel } from 'typeorm';

// @ts-expect-error: Type '"mysql"' is not assignable to type '"aurora-mysql"'
export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as TypeOrmModuleOptions['type'],
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : undefined,
  database: process.env.DB_NAME,
  entities: [],
  // todo: disable synchronize
  synchronize: true,
  autoLoadEntities: true,
  logging: (process.env.DB_LOG?.split(',') || []) as LogLevel[],
};
