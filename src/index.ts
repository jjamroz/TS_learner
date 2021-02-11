import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening on 3000');
});
