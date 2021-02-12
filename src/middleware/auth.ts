import { NextFunction, Request, Response } from 'express';
import { JwtUtil } from '../jwtUtil';

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    res.locals.user = JwtUtil.decodeToken(token);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
