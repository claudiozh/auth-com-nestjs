import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Auth')
        .setDescription('Descrição da api')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));

    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
