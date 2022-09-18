/* eslint-disable */

export const protobufPackage = "user";

export interface UserById {
  id: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  summary: string;
  region: string;
}

export interface UserService {
  findOne(request: UserById): Promise<User>;
}
