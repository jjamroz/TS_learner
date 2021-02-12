import jwt from 'jsonwebtoken';

export interface IUserPayload {
  user_id: string;
}

export function getToken(userPayload: IUserPayload): string {
  const secret = process.env.JWT_SECRET || 'secret';
  const expirationTime = process.env.TOKEN_EXP_TIME || 3600;
  return jwt.sign(userPayload, secret, { expiresIn: expirationTime });
}
