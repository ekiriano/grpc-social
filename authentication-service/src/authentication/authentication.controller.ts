import { firstValueFrom } from 'rxjs';
import {
  AuthenticationServiceControllerMethods,
  AuthenticationServiceController,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  ValidateRequest,
  LoginResponse,
} from '../../../proto/build/authentication';

import { AuthenticationService } from './authentication.service';

import { Controller } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';

@Controller('authentication')
@AuthenticationServiceControllerMethods()
// implements AuthenticationServiceController
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const user = await this.authenticationService.registerUser(data);
    const { firstName, lastName, email } = user;
    const registerResponse = { firstName, lastName, email };
    return registerResponse;
  }

  login(data: LoginRequest): Promise<LoginResponse> {
    // const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);

    const metadata = new Metadata();
    metadata.add('access-control-expose-headers', 'Set-Cookie');
    metadata.add('Set-Cookie', cookie);

    user.password = undefined;
    return user;
  }

  validate(data: ValidateRequest): Promise<ValidateResponse> {
    return firstValueFrom(
      this.authenticationService.validate({ token: data.token }),
    );
  }
}
