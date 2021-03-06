import jwt from 'jsonwebtoken';

export interface IUserPayload {
  user_id: string;
}

export class JwtUtil {
  private static secret = process.env.JWT_SECRET || 'secret';
  private static expirationTime = process.env.TOKEN_EXP_TIME || 3600;

  static getToken(userPayload: IUserPayload): string {
    return jwt.sign(userPayload, JwtUtil.secret, {
      expiresIn: JwtUtil.expirationTime,
    });
  }

  static decodeToken(token: string): IUserPayload {
    return <IUserPayload>jwt.verify(token, JwtUtil.secret);
  }
}

export function getToken(userPayload: IUserPayload): string {
  const secret = process.env.JWT_SECRET || 'secret';
  const expirationTime = process.env.TOKEN_EXP_TIME || 3600;
  return jwt.sign(userPayload, secret, { expiresIn: expirationTime });
}
