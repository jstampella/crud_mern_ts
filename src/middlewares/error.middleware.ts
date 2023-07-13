import { NextFunction, Request, Response } from 'express';
import { httpResponse } from '../utils/handleResponse';

export const errorMiddleware = (err: SyntaxError, _req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof SyntaxError && err.message.includes('JSON')) {
    // Manejo de errores para solicitudes con cuerpo JSON incorrecto
    httpResponse(res, 400, { status: 'ERROR', message: 'Body inválido, verifique el json' });
  } else {
    next();
  }
};
