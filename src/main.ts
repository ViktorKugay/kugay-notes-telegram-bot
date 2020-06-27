import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ErrorFilter} from './modules/common/error-filter';

bootstrap().catch(err => {
  console.log(err);
  process.exit(1);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(process.env.PORT || 3000);
}
