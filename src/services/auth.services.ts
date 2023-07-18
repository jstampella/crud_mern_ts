import jwt from 'jsonwebtoken';
import MiExcepcion from '../common/MiException';
import { IUserLogin, IUserRegister, IVerifyToken, LoginPayload } from '../interfaces/auth.interfaces';
import { UsersModel } from '../models';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../utils/jwt';
import { TOKEN_SECRET } from '../config';

/**
 * Function to register a user
 * @param param0 { name, email, password }
 * @returns Promise<LoginPayload>
 */
const registerNewUser = async ({ name, email, password }: IUserRegister): Promise<LoginPayload> => {
  const checkIs = await UsersModel.findOne({ email });
  if (checkIs) throw new MiExcepcion('El mail ya se encuentra registrado', 400);
  // hashing the password
  const passwordHash = await bcrypt.hash(password, 10);

  // creating the user
  const newUser = new UsersModel({
    name,
    email,
    password: passwordHash,
  });

  // saving the user in the database
  const userSaved = await newUser.save();

  // create access token
  const token = await createAccessToken({
    _id: userSaved._id,
  });

  if (token === undefined) throw new MiExcepcion('fallo la creacion del token', 400);

  const responseData: LoginPayload = {
    _id: userSaved._id.toString(),
    name,
    email,
    token,
  };
  return responseData;
};

/**
 * Function to login user
 * @param param0 { email, password }
 * @returns Promise<LoginPayload>
 */
const loginUser = async ({ email, password }: IUserLogin): Promise<LoginPayload> => {
  const checkIs = await UsersModel.findOne({ email });
  if (!checkIs) throw new MiExcepcion('El mail no se encuentra registrado', 404);

  const passwordHash = checkIs.password as string; //TODO el encriptado!
  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (!isCorrect) throw new MiExcepcion('El password es incorrecto', 404);

  // create access token
  const token = await createAccessToken({
    _id: checkIs._id,
    name: checkIs.name,
  });

  if (token === undefined) throw new MiExcepcion('fallo la creacion del token', 400);
  const data: LoginPayload = {
    _id: checkIs._id.toString(),
    name: checkIs.name,
    email,
    token,
  };
  return data;
};

/**
 * Function that verifies the token
 * @param token string
 * @returns Promise<IVerifyToken>
 */
const verifytoken = async (token: string): Promise<IVerifyToken> => {
  try {
    const decode = jwt.verify(token, TOKEN_SECRET) as { id: string };
    const userFound = await UsersModel.findById(decode.id);
    if (!userFound) throw new MiExcepcion('usuario inexistente', 401);
    const data: IVerifyToken = {
      _id: userFound._id.toString(),
      name: userFound.name,
      email: userFound.email,
    };
    return data;
  } catch (error) {
    throw new MiExcepcion('fallo al validar token', 401);
  }
};

export { registerNewUser, loginUser, verifytoken };
