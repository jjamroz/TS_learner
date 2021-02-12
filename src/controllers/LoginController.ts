import { NextFunction, Request, Response } from 'express';
import { get, post } from '../decorators/routes';
import { controller } from '../decorators/controller';
import { required } from '../decorators/required';
import User from '../database/User';
import bcrypt from 'bcrypt';
import { getToken } from '../jwtUtil';

@controller('/login')
export class LoginController {
  @post('/')
  @required('email', 'password')
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // TODO: JWT

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const token = getToken({ user_id: user.id });

      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Big OOF - something went wrong!' });
    }
  }
}
