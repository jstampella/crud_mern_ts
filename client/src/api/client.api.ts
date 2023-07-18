import { AxiosResponse } from 'axios';
import { handleError } from '../helpers/handleError';
import axios from './axios';
import { ApiResponse, IClient, IClientCreate, IClientPagination } from '../interfaces';

export const createClientApi = async (body: IClientCreate): Promise<IClient> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>('/client/', body);
    const response: IClient = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClient>(handleError(error));
  }
};

export const getAllClientsApi = async (
  page?: number,
  pageSize?: number
): Promise<IClientPagination> => {
  try {
    let resp: AxiosResponse<ApiResponse> | null = null;
    if (!page && !pageSize) resp = await axios.get<ApiResponse>('/client/all');
    else resp = await axios.get<ApiResponse>(`/client/all?page=${page}&limit=${pageSize}`);
    const response: IClientPagination = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClientPagination>(handleError(error));
  }
};

export const deleteClientApi = async (id: string): Promise<IClient[]> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.delete<ApiResponse>(`/client/${id}`);
    const response: IClient[] = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClient[]>(handleError(error));
  }
};

export const updateClientApi = async (id: string, body: IClientCreate): Promise<IClient> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.put<ApiResponse>(`/client/${id}`, body);
    const response: IClient = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClient>(handleError(error));
  }
};

export const getClientByIdApi = async (id: string): Promise<IClient> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`/client/${id}`);
    const response: IClient = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClient>(handleError(error));
  }
};

export const getClientByUserApi = async (): Promise<IClient[]> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>('/client');
    const response: IClient[] = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClient[]>(handleError(error));
  }
};

export const getClientSearchApi = async (search: string): Promise<IClientPagination> => {
  try {
    const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`/client/all${search}`);
    const response: IClientPagination = resp.data.data;
    return response;
  } catch (error: unknown) {
    return Promise.reject<IClientPagination>(handleError(error));
  }
};
