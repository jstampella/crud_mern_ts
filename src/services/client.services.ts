/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';
import removeAccents from 'remove-accents';
import { IClient, IClientFilter, IClientParams } from '../interfaces/client.interfaces';
import { ClientModel } from '../models';

/**
 * Function to create a customer
 * @param param0 { dni, nombre, apellido, sexo, telefono, user }
 * @returns Promise<Document<unknown, any, any>>
 */
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

/**
 * Function to get all customers by pagination and filter
 * @param param0 {apellido,dni,limit,nombre,page,sexo,telefono}
 * @returns Promise<{data: any[];total: number;page: number | undefined;limit: number | undefined;}>
 */
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
  const filter: IClientFilter = {};
  if (apellido) {
    filter['apellido'] = { $regex: new RegExp(removeAccents(apellido), 'i') };
  }
  if (dni) {
    filter['dni'] = dni;
  }
  if (nombre) {
    filter['nombre'] = { $regex: new RegExp(removeAccents(nombre), 'i') };
  }
  if (sexo) {
    filter['sexo'] = sexo;
  }
  if (telefono) {
    filter['telefono'] = telefono;
  }
  const total = await ClientModel.countDocuments(filter);
  const nPage = page || 1;
  const nLimit = limit || total;
  let clients = [];

  clients = await ClientModel.find(filter)
    .collation({ locale: 'es', strength: 2 })
    .skip(nPage * nLimit)
    .limit(nLimit)
    .populate('user', '-password');

  const data = { data: clients, total, page, limit };
  return data;
};
