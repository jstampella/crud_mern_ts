import { Request, Response } from 'express';
import { httpResponse } from '../utils/handleResponse';
import { handleHttpError } from '../utils/handleError';
import MiExcepcion from '../common/MiException';
import { matchedData } from 'express-validator';
import { IUserLogin, IUserRegister } from '../interfaces/auth.interfaces';
import { loginUser, registerNewUser, verifytoken } from '../services/auth.services';

/**
 * Function in charge of registering user
 * @param req Request
 * @param res Response
 */
export const registerCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestData = matchedData(req) as IUserRegister;
    const { token, ...responseUser } = await registerNewUser(requestData);
    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    });
    httpResponse(res, 201, { status: 'success', data: { ...responseUser, token } });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

/**
 * Function in charge of starting user session
 * @param req Request
 * @param res Response
 */
export const loginCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const requestData = matchedData(req) as IUserLogin;
    const { token, ...responseUser } = await loginUser(requestData);
    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    });
    httpResponse(res, 200, { status: 'success', data: { ...responseUser, token } });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

/**
 * Function in charge of verifying the session token
 * @param req Request
 * @param res Response
 */
export const verifyTokenCtrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.cookies;
    if (!token) throw new MiExcepcion('El token no existe', 500);
    const data = await verifytoken(token);
    httpResponse(res, 200, { status: 'success', data });
  } catch (error) {
    if (error instanceof MiExcepcion) {
      handleHttpError(res, error);
    } else if (error instanceof Error) {
      handleHttpError(res, error);
    }
  }
};

/**
 * Function in charge of closing session
 * @param req Request
 * @param res Response
 */
export const logoutCtrl = async (_req: Request, res: Response): Promise<void> => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  httpResponse(res, 200, { status: 'success' });
};
