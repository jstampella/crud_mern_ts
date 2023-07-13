import { TOKEN_SECRET } from '../config';
import jwt from 'jsonwebtoken';

export const createAccessToken = async (payload: string | object | Buffer): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
