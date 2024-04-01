import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';


async function bootstrap() {
  console.log("hey1")
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'your_secret_key',
      resave: true,
      saveUninitialized: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
