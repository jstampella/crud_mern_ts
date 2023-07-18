import { Request, Response } from 'express';
import { httpResponse } from '../utils/handleResponse';
import { handleHttpError } from '../utils/handleError';
import MiExcepcion from '../common/MiException';
import { matchedData } from 'express-validator';
import { ClientModel } from '../models';
import { ClientRequest, IClient, IClientParams } from '../interfaces/client.interfaces';
import { createClient, getClientsAll } from '../services/client.services';

export const getClientsAllCtrl = async (req: ClientRequest, res: Response): Promise<void> => {
  try {
    const params = matchedData(req) as IClientParams;
    const data = await getClientsAll(params);
    httpResponse(res, 200, { status: 'success', data });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

export const getClientsCtrl = async (req: ClientRequest, res: Response): Promise<void> => {
  try {
    const user = req.user?._id;
    if (!user) throw new MiExcepcion('No existe el id de usuario!', 404);
    const clients = await ClientModel.find({ user }).populate('user', '-password').limit(10);
    httpResponse(res, 200, { status: 'success', data: clients });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

export const createClientCtrl = async (req: ClientRequest, res: Response): Promise<void> => {
  try {
    const data = matchedData(req) as IClient;
    data.user = req.user?._id || '';
    const responseUser = await createClient(data);
    httpResponse(res, 201, { status: 'success', data: responseUser });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

export const deleteClientCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = matchedData(req) as IClient;
    const deletedClient = await ClientModel.findByIdAndDelete(id);
    if (!deletedClient) throw new MiExcepcion('Cliente no existe!', 404);
    httpResponse(res, 200, { status: 'success', data: deletedClient });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

export const updateClientCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, nombre, apellido, sexo, telefono } = matchedData(req) as IClient;
    const clientUpdate = await ClientModel.findOneAndUpdate({ _id: id }, { nombre, apellido, sexo, telefono }, { new: true });
    httpResponse(res, 200, { status: 'success', data: clientUpdate });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

export const getClientCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = matchedData(req) as IClient;
    const client = await ClientModel.findById(id);
    if (!client) throw new MiExcepcion('Cliente no existe', 404);
    httpResponse(res, 200, { status: 'success', data: client });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};
