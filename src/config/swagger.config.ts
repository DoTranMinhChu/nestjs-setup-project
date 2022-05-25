import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export class SwaggerConfig {
  static getDocumentConfig(): Omit<OpenAPIObject, 'paths'> {
    const configSwagger = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('NestJS API')
      .setVersion('1.0.0')
      .build();

    return configSwagger;
  }
}
