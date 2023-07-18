import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator';
import { Request } from 'express-serve-static-core';
import { NextFunction, Response } from 'express';

const validatorCreateClient = [
  check('dni').exists().notEmpty().isNumeric().isLength({ min: 6, max: 12 }),
  check('nombre').exists().notEmpty().isLength({ min: 3, max: 20 }),
  check('apellido').exists().notEmpty().isLength({ min: 3, max: 20 }),
  check('sexo').exists().notEmpty().isLength({ min: 1, max: 3 }),
  check('telefono').optional().notEmpty().isNumeric().isLength({ min: 8, max: 15 }),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];
const validatorUpdateClient = [
  check('nombre').optional().exists().notEmpty().isLength({ min: 3, max: 20 }),
  check('apellido').optional().exists().notEmpty().isLength({ min: 3, max: 20 }),
  check('sexo').optional().exists().notEmpty().isLength({ min: 1, max: 3 }),
  check('telefono').optional().exists().notEmpty().isNumeric().isLength({ min: 8, max: 15 }),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];
const validatorDeleteClient = [
  check('id').exists().isMongoId(),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

const validatorPaginationClient = [
  check('page').optional().exists().notEmpty().isNumeric(),
  check('limit').optional().exists().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

const validatorSearchClient = [
  check('dni').optional().exists().notEmpty().isNumeric(),
  check('nombre').optional().exists().notEmpty().isString(),
  check('apellido').optional().exists().notEmpty().isString(),
  check('sexo').optional().exists().notEmpty().isString(),
  check('telefono').optional().exists().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction): void => {
    return validateResults(req, res, next);
  },
];

export { validatorCreateClient, validatorUpdateClient, validatorDeleteClient, validatorPaginationClient, validatorSearchClient };
