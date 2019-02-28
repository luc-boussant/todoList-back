import { ConnectionOptions } from 'typeorm';

interface Config {
  appSecret: string;
  database: ConnectionOptions;
}

export const config: Config = {
  appSecret: process.env.APP_SECRET,
  database: {
    type: process.env.APP_DATABASE_TYPE as any,
    host: process.env.APP_DATABASE_HOST,
    port: parseInt(process.env.APP_DATABASE_PORT, 10),
    username: process.env.APP_DATABASE_USER,
    password: process.env.APP_DATABASE_PASSWORD,
    database: process.env.APP_DATABASE_NAME,
    synchronize: false,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [__dirname + '/../../migration/*.ts'],
    cli: {
      migrationsDir: __dirname + '/../../migration',
    },
  },
};
