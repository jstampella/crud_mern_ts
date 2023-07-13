import { NextFunction, Request, Response } from 'express';
import { validationResult as validate } from 'express-validator';
import { httpResponse } from './handleResponse';
import { ApiResponse } from '../interfaces/http.interfaces';

const validateResults = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validate(req);

  if (errors.isEmpty()) {
    return next();
  }

  const data: ApiResponse = {
    status: 'error-body',
    data: errors.mapped(),
    message: 'verifique los campos',
  };

  httpResponse(res, 403, data);
};

export { validateResults };
