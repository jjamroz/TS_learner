import { NextFunction, Request, Response } from 'express';
import { get, post } from '../decorators/routes';
import { controller } from '../decorators/controller';
import { required } from '../decorators/required';

@controller('/login')
export class LoginController {
  @post('/')
  @required('email', 'password')
  login(req: Request, res: Response) {
    const { email, password } = req.body;
    // TODO: JWT
    if (email === 'email' && password === 'password') {
      return res.json({ token: 'token' });
    }
    return res.status(400).json({ msg: 'Invalid Credentials' });
  }
}
