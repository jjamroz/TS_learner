import { Request, Response } from 'express';
import { post } from '../decorators/routes';
import { controller } from '../decorators/controller';
import { required } from '../decorators/required';
import User from '../database/User';

@controller('/user')
export class UserController {
  @post('/register')
  @required('name', 'email', 'password')
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'user already exist' });
      }

      user = await User.create({
        name: name,
        email: email,
        password: password,
      });

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'something went wrong' });
    }
  }
}
