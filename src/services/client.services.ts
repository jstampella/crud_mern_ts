/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';
import { IClient } from '../interfaces/client.interfaces';
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
