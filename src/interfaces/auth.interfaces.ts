import { Request } from 'express';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload extends IUserRegister {
  token: string;
}

export interface IVerifyToken {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedToken;
}

export interface AuthenticatedToken {
  id: string;
  iat: number;
  exp: number;
}
