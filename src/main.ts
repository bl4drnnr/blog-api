import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { fastifyCookie } from '@fastify/cookie';

async function bootstrap() {
  const PORT = process.env.PORT || 3002;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
  });

  app.setGlobalPrefix('/api/');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Blog Nest.js REST API')
    .setDescription('Documentation of resources o blog Nest.js REST API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}`)
  );
}
bootstrap();
