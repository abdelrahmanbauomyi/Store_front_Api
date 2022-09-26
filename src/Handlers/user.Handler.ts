import express, { Request, Response } from 'express';
import { user, user_Options } from '../Models/user.Model';
import jwt from 'jsonwebtoken';
import verifiy_Token from './Auth.middelware';

const Options = new user_Options();
const index = async (req: Request, res: Response) => {
  const list_Of_Users = await Options.index();
  res.json(list_Of_Users);
};

const show = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const required_User = await Options.show(id);
  res.json(required_User);
};

const create = async (req: Request, res: Response) => {
  try {
    const User: user = {
      fname: req.body.fname,
      lname: req.body.Lname,
      password: req.body.password,
    };
    // console.log(User)
    const newUser = await Options.create(User);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/Users', verifiy_Token, index);
  app.get('/Users/id', verifiy_Token, show);
  app.post('/Users', create);
};
export default userRoutes;
