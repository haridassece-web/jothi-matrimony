import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const port = process.env.PORT || 10000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Jothi Matrimony API Backend running on port ${port} bound to 0.0.0.0`);
}
bootstrap();
