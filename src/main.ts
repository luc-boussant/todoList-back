import * as dotenv from 'dotenv-safe';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './exception/entity-not-found.filter';
import { QueryFailedFilter } from './exception/query-failed.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new EntityNotFoundFilter());
  app.useGlobalFilters(new QueryFailedFilter());

  await app.listen(8000);
}
bootstrap();
