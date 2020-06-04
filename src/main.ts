import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

bootstrap().catch(err => {
  console.log(err);
  process.exit(1);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
