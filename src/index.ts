import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import { connectDB } from './database/db';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

connectDB();

app.listen(3000, () => {
  console.log('listening on 3000');
});
