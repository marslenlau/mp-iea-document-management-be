import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  //*configuration global prefix
  app.setGlobalPrefix('api/v1');

  //* config variables enviroment
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
