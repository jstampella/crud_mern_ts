/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';
import { NextFunction, Response } from 'express';
import { httpResponse } from '../utils/handleResponse';
import { handleHttpError } from '../utils/handleError';
import MiExcepcion from '../common/MiException';
import { AuthenticatedRequest, AuthenticatedToken } from '../interfaces/auth.interfaces';

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.cookies;
    if (!token) return httpResponse(res, 401, { status: 'No token, authorization denied' });
    const data = jwt.verify(token, TOKEN_SECRET) as AuthenticatedToken;
    req.user = data;
    next();
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    } else {
      handleHttpError(res, new Error('El token no es valido'));
    }
  }
};
