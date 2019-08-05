import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyMiddleware } from './util/applyMiddleware';
import UtilMiddleware from './util/middlewares/index';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  applyMiddleware(app, UtilMiddleware);

  const configService = app.get('ConfigService');

  if (configService.CORS) {
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setHost('team-player-ifsp.herokuapp.com')
    .setBasePath('api')
    .setTitle('Team Player')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(configService.PORT);
}
bootstrap();
