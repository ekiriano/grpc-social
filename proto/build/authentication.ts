/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "authentication";

export enum Region {
  ASIA_PACIFIC = 0,
  EUROPE_AFRICA = 1,
  AMERICAS = 2,
  UNKNOWN = 3,
  UNRECOGNIZED = -1,
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  region: Region;
  summary: string;
}

export interface RegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTHENTICATION_PACKAGE_NAME = "authentication";

export interface AuthenticationServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;
}

export interface AuthenticationServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
}

export function AuthenticationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthenticationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthenticationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTHENTICATION_SERVICE_NAME = "AuthenticationService";