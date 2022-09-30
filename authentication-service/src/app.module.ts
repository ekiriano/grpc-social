import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { jwtConstants } from './authentication/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationController } from './authentication/authentication.controller';

// Register first inject later

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: '../proto/user.proto',
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService, ConfigService],
})
export class AppModule {}
