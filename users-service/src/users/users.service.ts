import { CreateUserRequestDto } from '../../../proto/build/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import UserNotFoundException from 'src/exception/userNotFound.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(user: CreateUserRequestDto): Promise<User> {
    console.log({ user });
    const createdUser = this.usersRepository.create(user);
    console.log({ createdUser });
    this.usersRepository.save(createdUser);
    return createdUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(email);
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new UserNotFoundException(id);
  }

  // update() {
  //   return;
  // }
  // delete() {
  //   return;
  // }
}
