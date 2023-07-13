import { Response } from 'express';
import logger from '../config/winston';
import { httpResponse } from './handleResponse';
import MiExcepcion from '../common/MiException';
import { parseStackError } from './functions';

const handleHttpError = (res: Response, error: Error | MiExcepcion): void => {
  let codeValid = 500;
  const fileName = parseStackError(error.stack);
  if (error instanceof MiExcepcion) codeValid = error.code;
  logger.error(`${error.message} | code:${codeValid} | type: ${error.name} | filename: ${fileName}`);

  httpResponse(res, codeValid, { status: 'ERROR', message: error.message });
};

export { handleHttpError };
