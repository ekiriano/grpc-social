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

  // login(data: LoginRequest): Promise<LoginResponse> {}

  // validate(data: ValidateRequest): Promise<ValidateResponse> {}
}
