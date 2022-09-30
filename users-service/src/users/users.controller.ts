// import { User } from './../entity/user.entity';
import {
  UserServiceControllerMethods,
  UserById,
  UserByEmail,
  User,
  CreateUserRequestDto,
  UserServiceController,
} from '../../../proto/build/user';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  findOne(data: UserById): Promise<User> {
    console.log(data);
    const items = [
      {
        id: 'Guid_12828293',
        firstName: 'Amine',
        lastName: 'Soufyani',
        email: 'aminesoufyani@yahoo.fr',
        summary: 'I am a genial software engineer',
        region: 'ASIA_PACIFIC',
        password: undefined,
      },
      {
        id: 'Guid_12828291',
        firstName: 'Chloe',
        lastName: 'Miramand',
        email: 'chloemiramand@gmail.com',
        summary: 'I am a genial writter',
        region: 'ASIA_PACIFIC',
        password: undefined,
      },
    ];

    const userPromise = new Promise((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const user: User = items.find(({ id }) => id === data.id);
        resolve(user);
      }, 300);
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return userPromise;
  }

  findByEmail(data: UserByEmail): Promise<User> {
    const items = [
      {
        id: 'Guid_12828293',
        firstName: 'Amine',
        lastName: 'Soufyani',
        email: 'aminesoufyani@yahoo.fr',
        summary: 'I am a genial software engineer',
        region: 'ASIA_PACIFIC',
        password: undefined,
      },
      {
        id: 'Guid_12828291',
        firstName: 'Chloe',
        lastName: 'Miramand',
        email: 'chloemiramand@gmail.com',
        summary: 'I am a genial writter',
        region: 'ASIA_PACIFIC',
        password: 'secret123',
      },
    ];
    return new Promise(() => items.find(({ email }) => email === data.email));
  }

  async createUser(data: CreateUserRequestDto): Promise<User> {
    return this.usersService.create(data);
  }
}
