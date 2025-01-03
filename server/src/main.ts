import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as config from 'config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const port = process.env.SERVER_PORT || serverConfig.port;

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    whitelist: true
  }));
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  await app.listen(port);
  logger.log(`Application is listening on port ${port}`)
}
bootstrap();
