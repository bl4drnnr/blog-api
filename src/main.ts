import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Advances Nest.js REST API')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}`)
  );
}
bootstrap();
