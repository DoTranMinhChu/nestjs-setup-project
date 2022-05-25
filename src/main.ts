import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import { ServerConfig } from '@config/server.config';
import { SwaggerConfig } from '@config/swagger.config';
import { Environment } from '@constant/environment.enum';
import { AllExceptionsFilter } from '@filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const serverConfig = config.get<ServerConfig>('server');

  app.useGlobalPipes(new ValidationPipe());

  if (serverConfig.env == Environment.Development) {
    const document = SwaggerModule.createDocument(
      app,
      SwaggerConfig.getDocumentConfig(),
    );
    SwaggerModule.setup('api/document', app, document);
  }

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();
  await app.listen(serverConfig.port);
}

bootstrap();
