import { AxiosError } from 'axios';
import { ApiResponse } from '../interfaces';

export const handleError = (error: unknown) => {
  console.log(error);
  const axiosError = error as AxiosError;

  if (axiosError.code === 'ECONNABORTED') {
    throw new Error('Error con la conexion al servidor!');
  }

  if (axiosError.response) {
    const apiError = axiosError.response.data as ApiResponse;
    const errorResponse = apiError.message || 'Hubo un error desconocido en la API';
    throw new Error(errorResponse);
  }

  const genericError = axiosError.message || 'Ocurrio un error inesperado!';
  throw new Error(genericError);
};
