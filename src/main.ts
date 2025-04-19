import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './shared/all-exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3004);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('FinanceFlow API')
    .setDescription('API para la gestión de finanzas personales')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Expense Types')
    .addTag('Expenses')
    .addTag('Income Types')
    .addTag('Incomes')
    .addTag('Savings Goals')
    .addTag('Total')
    .addTag('Users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port, '0.0.0.0');
  console.log(
    `Application running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
}
bootstrap();
