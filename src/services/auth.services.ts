import jwt from 'jsonwebtoken';
import MiExcepcion from '../common/MiException';
import { IUserLogin, IUserRegister, IVerifyToken, LoginPayload } from '../interfaces/auth.interfaces';
import { UsersModel } from '../models';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../utils/jwt';
import { TOKEN_SECRET } from '../config';

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
    id: userSaved._id,
  });

  if (token === undefined) throw new MiExcepcion('fallo la creacion del token', 400);

  const responseData: LoginPayload = {
    name,
    email,
    password,
    token,
  };
  return responseData;
};

const loginUser = async ({ email, password }: IUserLogin): Promise<LoginPayload> => {
  const checkIs = await UsersModel.findOne({ email });
  if (!checkIs) throw new MiExcepcion('El mail no se encuentra registrado', 404);

  const passwordHash = checkIs.password as string; //TODO el encriptado!
  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (!isCorrect) throw new MiExcepcion('El password es incorrecto', 404);

  // create access token
  const token = await createAccessToken({
    id: checkIs._id,
    name: checkIs.name,
  });

  if (token === undefined) throw new MiExcepcion('fallo la creacion del token', 400);
  const data: LoginPayload = {
    name: checkIs.name,
    email,
    password,
    token,
  };
  return data;
};

const verifytoken = async (token: string): Promise<IVerifyToken> => {
  try {
    const data = jwt.verify(token, TOKEN_SECRET) as { id: string };
    const userFound = await UsersModel.findById(data.id);
    if (!userFound) throw new MiExcepcion('usuario inexistente', 401);
    return {
      id: userFound._id.toString(),
      name: userFound.name,
      email: userFound.email,
    };
  } catch (error) {
    throw new MiExcepcion('fallo al validar token', 401);
  }
};

export { registerNewUser, loginUser, verifytoken };
