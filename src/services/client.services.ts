/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';
import { IClient, IClientParams } from '../interfaces/client.interfaces';
import { ClientModel } from '../models';

export const createClient = async ({ dni, nombre, apellido, sexo, telefono, user }: IClient): Promise<Document<unknown, any, any>> => {
  const newTask = new ClientModel({
    dni,
    nombre,
    apellido,
    sexo,
    telefono,
    user,
  });
  const responseUser = await newTask.save();
  return responseUser;
};

export const getClientsAll = async ({
  apellido,
  dni,
  limit,
  nombre,
  page,
  sexo,
  telefono,
}: IClientParams): Promise<{
  data: any[];
  total: number;
  page: number | undefined;
  limit: number | undefined;
}> => {
  const total = await ClientModel.countDocuments();
  const nPage = page || 1;
  const nLimit = limit || total;
  let clients = [];
  const filter: IClientParams = {};

  if (apellido) {
    filter['apellido'] = apellido;
  }
  if (dni) {
    filter['dni'] = dni;
  }
  if (nombre) {
    filter['nombre'] = nombre;
  }
  if (sexo) {
    filter['sexo'] = sexo;
  }
  if (telefono) {
    filter['telefono'] = telefono;
  }
  clients = await ClientModel.find(filter)
    .skip(nPage * nLimit)
    .limit(nLimit)
    .populate('user', '-password');
  const data = { data: clients, total, page, limit };
  return data;
};
