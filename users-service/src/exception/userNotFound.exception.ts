import { NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor(property: unknown) {
    super(`User with ${property} not found`);
  }
}

export default UserNotFoundException;
