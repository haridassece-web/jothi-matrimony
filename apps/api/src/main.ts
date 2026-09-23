import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Jothi Matrimony API Backend running on http://localhost:${port}`);
}
bootstrap();
