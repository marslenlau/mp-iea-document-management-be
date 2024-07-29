import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.useGlobalFilters(new HttpExceptionFilter());
  //*configuration global prefix
  app.setGlobalPrefix('api/v1');

  //*configuration global pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  //* config variables enviroment
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
