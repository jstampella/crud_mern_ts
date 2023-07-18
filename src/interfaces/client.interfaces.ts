import { Request } from 'express';
import { IUserRegister } from './auth.interfaces';

export interface IClient {
  id?: string;
  dni: number;
  nombre: string;
  apellido: string;
  sexo: string;
  telefono: string;
  user: string;
}

export interface ClientRequest extends Request {
  user?: IUserRegister;
}

export interface IClientParams {
  dni?: number;
  nombre?: string;
  apellido?: string;
  sexo?: string;
  telefono?: number;
  limit?: number;
  page?: number;
}
