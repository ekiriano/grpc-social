import { join, resolve, basename, dirname } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5000',
        package: 'user',
        protoPath: '../proto/user.proto',
      },
    },
  );
  await app.listen();
  console.log(`Listening on: localhost:5000`);
}
bootstrap();
