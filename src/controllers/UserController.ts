import { Request, Response } from 'express';
import { post } from '../decorators/routes';
import { controller } from '../decorators/controller';
import { required } from '../decorators/required';
import User from '../database/User';
import bcrypt from 'bcrypt';
import { getToken } from '../jwtUtil';

@controller('/user')
export class UserController {
  @post('/register')
  @required('name', 'email', 'password')
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exist' });
      }

      const hashedPassword = await hashPassword(password);

      user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const token = getToken({ user_id: user.id });
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Big OOF - something went wrong!' });
    }
  }
}

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
