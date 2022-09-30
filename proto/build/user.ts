/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum Region {
  ASIA_PACIFIC = 0,
  EUROPE_AFRICA = 1,
  AMERICAS = 2,
  UNKNOWN = 3,
  UNRECOGNIZED = -1,
}

export interface UserByEmail {
  email: string;
}

export interface UserById {
  id: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  summary: string;
  region: Region;
  password: string;
}

export interface CreateUserRequestDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  region: Region;
  summary: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findOne(request: UserById): Observable<User>;

  findByEmail(request: UserByEmail): Observable<User>;

  createUser(request: CreateUserRequestDto): Observable<User>;
}

export interface UserServiceController {
  findOne(request: UserById): Promise<User> | Observable<User> | User;

  findByEmail(request: UserByEmail): Promise<User> | Observable<User> | User;

  createUser(request: CreateUserRequestDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findByEmail", "createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
