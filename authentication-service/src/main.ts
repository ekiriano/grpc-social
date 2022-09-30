import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5001',
        package: 'authentication',
        protoPath: '../proto/authentication.proto',
      },
    });

    await app.listen();
    console.log(`Listening on: localhost:5001`);
  } catch (err) {
    console.log('I am in danger !');
  }
}

bootstrap();

// It is worth mentioning that, by default, our build process does not copy the .proto files to the dist directory.
// Therefore, in my configuration, I point to the subscribers.proto in the src directory. Another approach would be to create a
// proto directory at the top of our project. We could also create a script that copies the .proto files to dist.
