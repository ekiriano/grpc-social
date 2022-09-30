import {
  UserServiceClient,
  CreateUserRequestDto,
  User,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from './../../../proto/build/user';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  private usersService: UserServiceClient;

  constructor(
    @Inject(USER_PACKAGE_NAME) private client: ClientGrpc,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    console.log('Hello from constructor !');
  }

  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    console.log({ userService: this.usersService });
  }

  // change back fom secure to HttpsOnly when deploying;
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; Secure; SameSite=None; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  registerUser(data: CreateUserRequestDto): Promise<User> {
    const hashedPassword = bcrypt.hash(data.password, 10);
    try {
      const createdUser$ = this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });

      return firstValueFrom(createdUser$);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async verifyPassword(plainText: string, hashed: string) {
    const isPasswordMatching = await bcrypt.compare(plainText, hashed);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user$ = await this.usersService.findByEmail({ email });
      let user;
      user$.subscribe((val) => {
        user = val;
      });
      this.verifyPassword(user.password, hashedPassword);

      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
