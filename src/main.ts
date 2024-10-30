import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get('PORT'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
